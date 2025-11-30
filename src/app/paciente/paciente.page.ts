import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { CadastroCRUD } from '../_logica/persistencia/CadastroCRUD';
import { Cadastro } from '../_logica/entidades/Cadastro';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
  standalone: false,
})
export class PacientePage {

  nome: string = '';
  dataNascimento: string = '';
  email: string = '';
  cpf: string = '';
  genero: string = '';
  endereco: string = '';
  foto: string = ''; // Base64 da foto

  private cadastroCRUD: CadastroCRUD;

  constructor(private storage: Storage, private router: Router) {
    this.cadastroCRUD = new CadastroCRUD(this.storage);
    this.iniciar();
  }

  private async iniciar() {
    await this.cadastroCRUD.inicializar();

    const cadastro: Cadastro | null = await this.cadastroCRUD.obterCadastro();

    if (!cadastro) {
      console.log('Nenhum cadastro encontrado');
      return;
    }

    this.nome = cadastro.getNome();
    this.dataNascimento = cadastro.getDataNascimento();
    this.email = cadastro.getEmail();
    this.cpf = cadastro.getCpf();
    this.genero = cadastro.getGenero();
    this.foto = cadastro.getFoto(); // Carrega a foto

    const partesEndereco: string[] = [];

    let ruaNumero = cadastro.getLogradouro();
    if (ruaNumero) {
      if (cadastro.getNumero()) {
        ruaNumero += ', ' + cadastro.getNumero();
      }
      partesEndereco.push(ruaNumero);
    }

    if (cadastro.getBairro()) {
      partesEndereco.push(cadastro.getBairro());
    }

    const cidadeEstado = `${cadastro.getCidade() || ''}${cadastro.getCidade() && cadastro.getEstado() ? ' - ' : ''}${cadastro.getEstado() || ''}`;
    if (cidadeEstado.trim()) {
      partesEndereco.push(cidadeEstado);
    }

    if (cadastro.getCep()) {
      partesEndereco.push('CEP: ' + cadastro.getCep());
    }

    this.endereco = partesEndereco.join(' - ');
  }

  async logout() {
    await this.storage.create();
    await this.storage.remove('sessao_logada');

    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '';
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  formatarData(data: string): string {
    if (!data) return '';

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return data;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    }

    if (/^\d{8}$/.test(data)) {
      const dia = data.substring(0, 2);
      const mes = data.substring(2, 4);
      const ano = data.substring(4, 8);
      return `${dia}/${mes}/${ano}`;
    }

    return data;
  }

  // --- Lógica de Foto ---
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.foto = e.target.result; // Atualiza a visualização imediatamente
        this.salvarFotoAutomaticamente(); // Opcional: salvar assim que escolhe
      };
      reader.readAsDataURL(file);
    }
  }

  async salvarFotoAutomaticamente() {
    const cadastro = await this.cadastroCRUD.obterCadastro();
    if (cadastro) {
      cadastro.setFoto(this.foto);
      await this.cadastroCRUD.salvarCadastro(cadastro);
    }
  }


  // Editar informações do paciente
  isModalOpen = false;
  editNome = '';
  editCpf = '';
  editEmail = '';
  editDataNascimento = '';
  editGenero = '';
  editCep = '';
  editLogradouro = '';
  editNumero = '';
  editBairro = '';
  editCidade = '';
  editEstado = '';
  editSenha = '';

  abrirModalEdicao() {
    this.editNome = this.nome;
    this.editCpf = this.cpf;
    this.editEmail = this.email;
    this.editDataNascimento = this.dataNascimento;
    this.editGenero = this.genero;
    this.carregarDadosParaEdicao();
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
  }

  async carregarDadosParaEdicao() {
    const cadastro = await this.cadastroCRUD.obterCadastro();
    if (cadastro) {
      this.editNome = cadastro.getNome();
      this.editCpf = cadastro.getCpf();
      this.editEmail = cadastro.getEmail();
      this.editDataNascimento = cadastro.getDataNascimento();
      this.editGenero = cadastro.getGenero();
      this.editSenha = cadastro.getSenha();
      this.editLogradouro = cadastro.getLogradouro();
      this.editNumero = cadastro.getNumero();
      this.editBairro = cadastro.getBairro();
      this.editCidade = cadastro.getCidade();
      this.editEstado = cadastro.getEstado();
      this.editCep = cadastro.getCep();
    }
  }

  async salvarEdicao() {
    if (!this.editNome || !this.editCpf) {
      return;
    }

    const novoCadastro = new Cadastro(
      this.editNome,
      this.editCpf,
      this.editEmail,
      this.editDataNascimento,
      this.editGenero,
      this.editSenha,
      this.editLogradouro,
      this.editNumero,
      this.editBairro,
      this.editCidade,
      this.editEstado,
      this.editCep,
      this.foto // Mantém a foto atual
    );

    await this.cadastroCRUD.salvarCadastro(novoCadastro);
    await this.iniciar();
    this.fecharModal();
  }

  // Máscaras (reutilizadas do cadastro, idealmente estariam em um utilitário)
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
    this.editCpf = value;
  }

  mascaraCEP(event: any) {
    let value: string = event.detail.value || '';
    value = value.replace(/\D/g, '').substring(0, 8);
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d+)/, '$1-$2');
    }
    this.editCep = value;
  }

  mascaraDataNasc(event: any) {
    let value: string = event.detail.value || '';
    value = value.replace(/\D/g, '').substring(0, 8);
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    this.editDataNascimento = value;
  }

}
