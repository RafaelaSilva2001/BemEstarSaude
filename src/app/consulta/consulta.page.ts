import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Consulta } from '../_logica/entidades/Consulta';
import { ConsultaCRUD } from '../_logica/persistencia/ConsultaCRUD';
import { CadastroCRUD } from '../_logica/persistencia/CadastroCRUD';
import { Cadastro } from '../_logica/entidades/Cadastro';
import { AlertController } from '@ionic/angular';

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
  carregando: boolean = true;
  usuarioLogado: Cadastro | null = null;

  private consultaCRUD: ConsultaCRUD;
  private cadastroCRUD: CadastroCRUD;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.consultaCRUD = new ConsultaCRUD(this.storage);
    this.cadastroCRUD = new CadastroCRUD(this.storage);
    this.iniciar();
  }

  async iniciar() {
    await this.consultaCRUD.inicializar();
    await this.cadastroCRUD.inicializar();

    this.usuarioLogado = await this.cadastroCRUD.obterCadastro();
    this.consultas = await this.consultaCRUD.obterConsultas();

    this.filtrarConsultas();
    this.carregando = false;
  }

  private filtrarConsultas() {
    this.minhasConsultas = [];
    this.outrasConsultas = [];

    if (!this.usuarioLogado) {
      // Se não tiver usuário logado (erro?), mostra tudo em "Outras" ou trata como preferir
      this.outrasConsultas = [...this.consultas];
      return;
    }

    const cpfLogado = this.usuarioLogado.getCpf();

    for (const c of this.consultas) {
      if (c.getCpfPaciente() === cpfLogado) {
        this.minhasConsultas.push(c);
      } else {
        this.outrasConsultas.push(c);
      }
    }
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
    // Não precisa refiltrar pois a referência do objeto é a mesma, 
    // mas se mudasse de lista precisaria. Aqui só muda status.
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
    // Remove da lista geral
    const index = this.consultas.indexOf(consulta);
    if (index > -1) {
      this.consultas.splice(index, 1);
    }

    // Remove das listas filtradas
    const indexMinhas = this.minhasConsultas.indexOf(consulta);
    if (indexMinhas > -1) {
      this.minhasConsultas.splice(indexMinhas, 1);
    }

    const indexOutras = this.outrasConsultas.indexOf(consulta);
    if (indexOutras > -1) {
      this.outrasConsultas.splice(indexOutras, 1);
    }

    await this.salvarConsultasNoStorage();
  }
}
