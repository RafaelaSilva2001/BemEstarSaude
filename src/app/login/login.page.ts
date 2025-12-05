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

    const usuarioLogado = await this.cadastroCRUD.autenticar(this.email, this.senha);

    if (usuarioLogado) {
      await this.storage.set('sessao_logada', true);
      // Opcional: Salvar detalhes do usuário logado na sessão se necessário futuramente
      // await this.storage.set('usuario_atual', usuarioLogado);

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
