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

    const sessaoLogada = await this.storage.get('sessaoLogada');

    if (sessaoLogada === true) {
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    }
  }

  visualizarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  async login() {
    this.mensagemErro = '';

    await this.storage.create();
    await this.cadastroCRUD.inicializar();

    const todosCadastros: Cadastro[] = await this.cadastroCRUD.obterTodosCadastros();

    if (!todosCadastros || todosCadastros.length === 0) {
      this.mensagemErro = 'Nenhum usuário cadastrado. Crie sua conta primeiro.';
      return;
    }

    const emailInformado = this.email.trim().toLowerCase();
    const senhaInformada = this.senha.trim();

    let usuarioEncontrado: Cadastro | null = null;

    for (const usuario of todosCadastros) {
      const emailCadastrado = (usuario.getEmail() || '').trim().toLowerCase();
      const senhaCadastrada = (usuario.getSenha() || '').trim();

      if (emailInformado === emailCadastrado && senhaInformada === senhaCadastrada) {
        usuarioEncontrado = usuario;
        break;
      }
    }

    if (!usuarioEncontrado) {
      this.mensagemErro = 'E-mail e/ou senha inválidos.';
      return;
    }

    await this.storage.set('sessaoLogada', true);
    await this.storage.set('cpfLogado', usuarioEncontrado.getCpf());

    this.email = '';
    this.senha = '';

    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }

  async logout() {
    await this.storage.remove('sessaoLogada');
    await this.storage.remove('cpfLogado');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
