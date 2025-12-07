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
  foto: string = '';

  private cadastroCRUD: CadastroCRUD;
  private cpfLogado: string = '';

  constructor(private storage: Storage, private router: Router) {
    this.cadastroCRUD = new CadastroCRUD(this.storage);
  }

  async ionViewWillEnter() {
    await this.iniciar();
  }

  private async iniciar() {
    await this.storage.create();
    await this.cadastroCRUD.inicializar();

    const cpfLogado = await this.storage.get('cpfLogado');

    if (!cpfLogado) {
      console.log('Nenhum CPF logado encontrado. Redirecionando para login.');
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return;
    }

    this.cpfLogado = cpfLogado;

    const cadastro: Cadastro | null = await this.cadastroCRUD.obterCadastroPorCpf(this.cpfLogado);

    if (!cadastro) {
      console.log('Nenhum cadastro encontrado para o CPF logado.');
      return;
    }

    this.nome = cadastro.getNome();
    this.dataNascimento = cadastro.getDataNascimento();
    this.email = cadastro.getEmail();
    this.cpf = cadastro.getCpf();
    this.genero = cadastro.getGenero();
    this.foto = cadastro.getFoto() || '';

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

    const cidadeEstado =
      `${cadastro.getCidade() || ''}` +
      `${cadastro.getCidade() && cadastro.getEstado() ? ' - ' : ''}` +
      `${cadastro.getEstado() || ''}`;

    if (cidadeEstado.trim()) {
      partesEndereco.push(cidadeEstado);
    }

    if (cadastro.getCep()) {
      partesEndereco.push('CEP: ' + cadastro.getCep());
    }

    this.endereco = partesEndereco.join(' - ');
  }

  async logout() {
    await this.storage.remove('sessaoLogada');
    await this.storage.remove('cpfLogado');
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

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.foto = e.target.result;

        if (!this.cpfLogado) return;

        const cadastro = await this.cadastroCRUD.obterCadastroPorCpf(this.cpfLogado);
        if (cadastro) {
          cadastro.setFoto(this.foto);
          await this.cadastroCRUD.salvarCadastro(cadastro);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // --- Edição ---
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
    this.carregarDadosParaEdicao();
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
  }

  async carregarDadosParaEdicao() {
    if (!this.cpfLogado) {
      console.log('CPF logado não encontrado ao carregar dados para edição.');
      return;
    }

    const cadastro = await this.cadastroCRUD.obterCadastroPorCpf(this.cpfLogado);
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

    if (!this.cpfLogado) {
      console.log('CPF logado não encontrado ao salvar edição.');
      return;
    }

    const cadastro = await this.cadastroCRUD.obterCadastroPorCpf(this.cpfLogado);
    if (!cadastro) {
      console.log('Cadastro não encontrado ao salvar edição.');
      return;
    }

    cadastro.setNome(this.editNome);
    cadastro.setCpf(this.editCpf);
    cadastro.setEmail(this.editEmail);
    cadastro.setDataNascimento(this.editDataNascimento);
    cadastro.setGenero(this.editGenero);
    cadastro.setSenha(this.editSenha);
    cadastro.setLogradouro(this.editLogradouro);
    cadastro.setNumero(this.editNumero);
    cadastro.setBairro(this.editBairro);
    cadastro.setCidade(this.editCidade);
    cadastro.setEstado(this.editEstado);
    cadastro.setCep(this.editCep);
    cadastro.setFoto(this.foto);

    await this.cadastroCRUD.salvarCadastro(cadastro);

    this.cpfLogado = this.editCpf;
    await this.storage.set('cpfLogado', this.cpfLogado);

    await this.iniciar();
    this.fecharModal();
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
