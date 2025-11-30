import { Component } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { CadastroCRUD } from '../_logica/persistencia/CadastroCRUD';
import { Cadastro } from '../_logica/entidades/Cadastro';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {

  nome: string = '';
  saudacao: string = '';
  secaoAtiva: string = 'sobre';

  private cadastroCRUD: CadastroCRUD;

  constructor(private storage: Storage) {
    this.cadastroCRUD = new CadastroCRUD(this.storage);
    this.iniciar();
  }

  private async iniciar() {
    await this.cadastroCRUD.inicializar();

    const cadastro: Cadastro | null = await this.cadastroCRUD.obterCadastro();

    if (cadastro) {
      this.nome = cadastro.getNome();
    } else {
      this.nome = 'Paciente';
    }

    this.definirSaudacao();
  }

  private definirSaudacao() {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
      this.saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
  }

  selecionarSecao(secao: string) {
    this.secaoAtiva = secao;
  }

}
