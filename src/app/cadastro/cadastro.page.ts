import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Cadastro } from '../_logica/entidades/Cadastro';
import { CadastroCRUD } from '../_logica/persistencia/CadastroCRUD';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {

  nome = '';
  cpf = '';
  email = '';
  dataNascimento = '';
  genero = '';
  senha = '';
  foto = '';

  logradouro = '';
  numero = '';
  bairro = '';
  cidade = '';
  estado = '';
  cep = '';

  private cadastroCRUD: CadastroCRUD;

  constructor(private storage: Storage, private alertController: AlertController, private router: Router) {
    this.cadastroCRUD = new CadastroCRUD(this.storage);
    this.iniciar();
  }

  async iniciar() {
    await this.cadastroCRUD.inicializar();
  }

  async cadastrar() {
    if (!this.nome || !this.cpf || !this.email || !this.senha || !this.dataNascimento 
      || !this.genero || !this.logradouro || !this.numero || !this.bairro ||
      !this.cidade || !this.estado || !this.cep) {
      await this.exibirAlerta('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    const cadastroExistente = await this.cadastroCRUD.obterCadastroPorCpf(this.cpf);
    if (cadastroExistente) {
      await this.exibirAlerta('Atenção', 'Este CPF já está cadastrado. Informe um novo CPF');
      return;
    }

    const cadastro = new Cadastro(
      this.nome,
      this.cpf,
      this.email,
      this.dataNascimento,
      this.genero,
      this.senha,
      this.logradouro,
      this.numero,
      this.bairro,
      this.cidade,
      this.estado,
      this.cep,
      this.foto || ''
    );

    await this.cadastroCRUD.salvarCadastro(cadastro);
    await this.exibirAlerta('Sucesso', 'Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }

  async exibirAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
    return alert.onDidDismiss(); 
  }

  // Máscaras
  mascaraCPF(event: any) {
    let value: string = event.detail.value || '';

    value = value.replace(/\D/g, '').substring(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    }

    this.cpf = value;
  }

  mascaraCEP(event: any) {
    let value: string = event.detail.value || '';

    value = value.replace(/\D/g, '').substring(0, 8);

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d+)/, '$1-$2');
    }

    this.cep = value;
  }

  mascaraDataNasc(event: any) {
    let value: string = event.detail.value || '';

    value = value.replace(/\D/g, '').substring(0, 8);

    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    this.dataNascimento = value;
  }

  selecionarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
