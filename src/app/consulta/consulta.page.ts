import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Consulta } from '../_logica/entidades/Consulta';
import { ConsultaCRUD } from '../_logica/persistencia/ConsultaCRUD';
import { CadastroCRUD } from '../_logica/persistencia/CadastroCRUD';
import { Cadastro } from '../_logica/entidades/Cadastro';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
  standalone: false,
})
export class ConsultaPage {

  consultas: Consulta[] = [];

  minhasConsultas: Consulta[] = [];
  outrasConsultas: Consulta[] = [];

  usuarioLogado: Cadastro | null = null;

  private consultaCRUD: ConsultaCRUD;
  private cadastroCRUD: CadastroCRUD;

  constructor(private storage: Storage, private alertCtrl: AlertController) {
    this.consultaCRUD = new ConsultaCRUD(this.storage);
    this.cadastroCRUD = new CadastroCRUD(this.storage);
  }

  ionViewWillEnter() {
    this.iniciar();
  }

  async iniciar() {
    await this.storage.create();

    await this.consultaCRUD.inicializar();
    await this.cadastroCRUD.inicializar();

    const cpfLogado: string | null = await this.storage.get('cpfLogado');

    if (!cpfLogado) {
      console.log('Nenhum CPF logado. Não é possível carregar o relatório.');
      this.usuarioLogado = null;
      this.consultas = [];
      this.minhasConsultas = [];
      this.outrasConsultas = [];
      return;
    }

    this.usuarioLogado = await this.cadastroCRUD.obterCadastroPorCpf(cpfLogado);

    this.consultas = await this.consultaCRUD.obterConsultas();

    this.filtrarConsultas(cpfLogado);
  }

  private filtrarConsultas(cpfLogado: string) {
    const cpfBase = cpfLogado.replace(/\D/g, '');

    const consultasDoUsuario = this.consultas.filter((c) => {
      const cpfUsuario = (c.getCpfUsuario() || '').replace(/\D/g, '');
      return cpfUsuario === cpfBase;
    });

    this.minhasConsultas = consultasDoUsuario.filter((c) => {
      const cpfPaciente = (c.getCpfPaciente() || '').replace(/\D/g, '');
      return cpfPaciente === cpfBase;
    });

    this.outrasConsultas = consultasDoUsuario.filter((c) => {
      const cpfPaciente = (c.getCpfPaciente() || '').replace(/\D/g, '');
      return cpfPaciente !== cpfBase;
    });
  }

  formatarDataConsulta(data: string | null): string {
    if (!data) return '';

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return data;
    }

    const partes = data.split('-');
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }

    return data;
  }

  private async salvarConsultasNoStorage(): Promise<void> {
    const dados: any[] = [];

    for (const c of this.consultas) {
      dados.push({
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
        status: c.getStatus ? c.getStatus() : 'Agendada',
        cpfUsuario: c.getCpfUsuario(),
      });
    }

    await this.storage.set('consultas', dados);
  }

  async confirmarCancelamento(consulta: Consulta) {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar consulta',
      message: 'Tem certeza que deseja cancelar esta consulta?',
      buttons: [
        { text: 'Voltar', role: 'cancel' },
        {
          text: 'Cancelar consulta',
          role: 'destructive',
          handler: () => {
            this.cancelarConsulta(consulta);
          },
        },
      ],
    });

    await alert.present();
  }

  private async cancelarConsulta(consulta: Consulta) {
    consulta.setStatus('Cancelada');
    await this.salvarConsultasNoStorage();

    const cpfLogado: string | null = await this.storage.get('cpfLogado');
    if (cpfLogado) {
      this.filtrarConsultas(cpfLogado);
    }
  }

  async confirmarExclusao(consulta: Consulta) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir consulta',
      message: 'Tem certeza que deseja excluir esta consulta do histórico?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.excluirConsulta(consulta);
          },
        },
      ],
    });

    await alert.present();
  }

  private async excluirConsulta(consulta: Consulta) {
    this.consultas = this.consultas.filter(c => c !== consulta);

    await this.salvarConsultasNoStorage();

    const cpfLogado: string | null = await this.storage.get('cpfLogado');
    if (cpfLogado) {
      this.filtrarConsultas(cpfLogado);
    }
  }
}
