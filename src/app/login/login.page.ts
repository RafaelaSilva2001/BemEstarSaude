import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { CadastroCRUD } from '../_logica/persistencia/CadastroCRUD';
import { Cadastro } from '../_logica/entidades/Cadastro';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  senha = '';
  mostrarSenha = false;
  mensagemErro = '';

  private cadastroCRUD: CadastroCRUD;

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.cadastroCRUD = new CadastroCRUD(this.storage);
    this.iniciar();
  }

  private async iniciar() {
    await this.storage.create();
    await this.cadastroCRUD.inicializar();

    const sessaoLogada = await this.storage.get('sessao_logada');

    if (sessaoLogada === true) {
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    }
  }

  visualizarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  async login() {
    this.mensagemErro = '';

    const cadastro: Cadastro | null = await this.cadastroCRUD.obterCadastro();

    if (!cadastro) {
      this.mensagemErro = 'Nenhuma conta encontrada. Cadastre-se.';
      return;
    }

    const infoLogin =
      this.email.trim().toLowerCase() === (cadastro.getEmail() || '').trim().toLowerCase() &&
      this.senha.trim() === (cadastro.getSenha() || '').trim();

    if (infoLogin) {
      await this.storage.set('sessao_logada', true);

      this.email = '';
      this.senha = '';

      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } else {
      this.mensagemErro = 'E-mail e/ou senha inválidos.';
    }
  }

  async logout() {
    await this.storage.remove('sessao_logada');

    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
