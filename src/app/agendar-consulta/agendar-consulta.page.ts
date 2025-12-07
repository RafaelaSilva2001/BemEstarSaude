import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { lista_medicos, Medico } from '../medicos/medicos-dados';
import { Storage } from '@ionic/storage-angular';
import { Consulta } from '../_logica/entidades/Consulta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar-consulta',
  templateUrl: './agendar-consulta.page.html',
  styleUrls: ['./agendar-consulta.page.scss'],
  standalone: false,
})
export class AgendarConsultaPage {

  consultaPara: 'mim' | 'outro' = 'mim';

  paciente = {
    nome: '',
    cpf: '',
    cep: '',
    genero: '',
    dataNascimento: ''
  };

  medicos: Medico[] = lista_medicos;
  medicosFiltrados: Medico[] = [];

  especialidades: string[] = [];

  horariosDisponiveis: string[] = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30'
  ];

  especialidadeSelecionada: string | null = null;
  medicoSelecionado: string | null = null;
  dataConsulta: string | null = null;
  horarioConsulta: string | null = null;

  consultas: Consulta[] = [];

  constructor(
    private toastCtrl: ToastController,
    private storage: Storage,
    private router: Router
  ) {
    this.preencherEspecialidades();
    this.medicosFiltrados = [...this.medicos];
    this.iniciar();
  }

  async iniciar() {
    await this.storage.create();
    await this.carregarConsultas();
  }

  preencherEspecialidades() {
    const lista: string[] = [];

    for (const medico of this.medicos) {
      if (!lista.includes(medico.especialidade)) {
        lista.push(medico.especialidade);
      }
    }

    this.especialidades = lista;
  }

  buscarConsulta() {
    this.paciente = {
      nome: '',
      cpf: '',
      cep: '',
      genero: '',
      dataNascimento: ''
    };
  }

  buscarEspecialidade() {
    this.medicoSelecionado = null;

    if (!this.especialidadeSelecionada) {
      this.medicosFiltrados = [...this.medicos];
      return;
    }

    const filtrados: Medico[] = [];

    for (const medico of this.medicos) {
      if (medico.especialidade === this.especialidadeSelecionada) {
        filtrados.push(medico);
      }
    }

    this.medicosFiltrados = filtrados;
  }

  private async carregarConsultas(): Promise<void> {
    const salvo: any[] = await this.storage.get('consultas');

    this.consultas = [];

    if (salvo && salvo.length > 0) {
      for (const c of salvo) {

        const status: 'Agendada' | 'Cancelada' =
          c.status === 'Cancelada' ? 'Cancelada' : 'Agendada';

        const consulta = new Consulta(
          c.consultaPara,
          c.nomePaciente,
          c.cpfPaciente,
          c.cepPaciente,
          c.generoPaciente,
          c.dataNascimentoPaciente,
          c.especialidade,
          c.medico,
          c.dataConsulta,
          c.horarioConsulta,
          status,
          c.cpfUsuario
        );

        this.consultas.push(consulta);
      }
    }
  }

  private async salvarConsultas(): Promise<void> {
    const dados: any[] = [];

    for (const c of this.consultas) {
      const obj = {
        consultaPara: c.getConsultaPara(),
        nomePaciente: c.getNomePaciente(),
        cpfPaciente: c.getCpfPaciente(),
        cepPaciente: c.getCepPaciente(),
        generoPaciente: c.getGeneroPaciente(),
        dataNascimentoPaciente: c.getDataNascimentoPaciente(),
        especialidade: c.getEspecialidade(),
        medico: c.getMedico(),
        dataConsulta: c.getDataConsulta(),
        horarioConsulta: c.getHorarioConsulta(),
        status: c.getStatus(),
        cpfUsuario: c.getCpfUsuario(),
      };

      dados.push(obj);
    }

    await this.storage.set('consultas', dados);
  }

  // --- Máscaras ---
  maskCPF(event: any) {
    let value: string = event.detail.value || '';

    value = value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    }

    this.paciente.cpf = value;
  }

  maskCEP(event: any) {
    let value: string = event.detail.value || '';

    value = value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d+)/, '$1-$2');
    }

    this.paciente.cep = value;
  }

  maskDataNascimento(event: any) {
    let value: string = event.detail.value || '';

    value = value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    this.paciente.dataNascimento = value;
  }

  get formularioValido() {
    const dadosConsulta =
      !!this.especialidadeSelecionada &&
      !!this.medicoSelecionado &&
      !!this.dataConsulta &&
      !!this.horarioConsulta;

    if (this.consultaPara === 'mim') return dadosConsulta;

    const dadosPaciente =
      this.paciente.nome.trim().length > 2 &&
      this.paciente.cpf.trim().length >= 11 &&
      !!this.paciente.genero &&
      !!this.paciente.dataNascimento;

    return dadosConsulta && dadosPaciente;
  }

  private async obterDadosPacienteParaConsulta() {
    if (this.consultaPara === 'mim') {
      const cpfLogado = await this.storage.get('cpfLogado');

      if (cpfLogado) {
        const usuarios: any[] = await this.storage.get('usuarios');

        if (usuarios && Array.isArray(usuarios)) {
          const cpfBase = String(cpfLogado).replace(/\D/g, '');

          const cadastro = usuarios.find(u =>
            String(u.cpf || '').replace(/\D/g, '') === cpfBase
          );

          if (cadastro) {
            return {
              nome: cadastro.nome,
              cpf: cadastro.cpf,
              cep: cadastro.cep,
              genero: cadastro.genero,
              dataNascimento: cadastro.dataNascimento,
            };
          }
        }
      }
    }

    return { ...this.paciente };
  }

  private async obterCpfUsuarioLogado(): Promise<string> {
    const cpfLogado = await this.storage.get('cpfLogado');
    return cpfLogado || '';
  }

  async confirmarAgendamento() {
    if (!this.formularioValido) {
      const toastErro = await this.toastCtrl.create({
        message: 'Preencha todos os campos obrigatórios.',
        duration: 1500,
        position: 'top',
        color: 'danger',
      });
      await toastErro.present();
      return;
    }

    const dadosPaciente = await this.obterDadosPacienteParaConsulta();
    const cpfUsuario = await this.obterCpfUsuarioLogado();

    const novaConsulta = new Consulta(
      this.consultaPara,
      dadosPaciente.nome,
      dadosPaciente.cpf,
      dadosPaciente.cep,
      dadosPaciente.genero,
      dadosPaciente.dataNascimento,
      this.especialidadeSelecionada || '',
      this.medicoSelecionado || '',
      this.dataConsulta || '',
      this.horarioConsulta || '',
      'Agendada',
      cpfUsuario
    );

    this.consultas.push(novaConsulta);
    await this.salvarConsultas();

    const toast = await this.toastCtrl.create({
      message: 'Consulta confirmada!',
      duration: 1500,
      position: 'top',
      color: 'success',
    });
    await toast.present();

    console.log('Consulta agendada:', {
      consultaPara: novaConsulta.getConsultaPara(),
      paciente: {
        nome: novaConsulta.getNomePaciente(),
        cpf: novaConsulta.getCpfPaciente(),
        cep: novaConsulta.getCepPaciente(),
        genero: novaConsulta.getGeneroPaciente(),
        dataNascimento: novaConsulta.getDataNascimentoPaciente(),
      },
      consulta: {
        especialidade: novaConsulta.getEspecialidade(),
        medico: novaConsulta.getMedico(),
        dataConsulta: novaConsulta.getDataConsulta(),
        horarioConsulta: novaConsulta.getHorarioConsulta(),
      },
      usuarioResponsavel: cpfUsuario,
    });

    this.router.navigate(['/tabs/consulta']).then(() => {
      window.location.reload();
    });
  }

}
