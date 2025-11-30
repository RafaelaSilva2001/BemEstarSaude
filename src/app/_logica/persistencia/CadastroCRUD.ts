import { Storage } from '@ionic/storage-angular';
import { Cadastro } from '../entidades/Cadastro';

export class CadastroCRUD {

  private contaCadastrada: Cadastro | null = null;

  constructor(private storage: Storage) { }

  async inicializar(): Promise<void> {
    await this.storage.create();

    const salvo = await this.storage.get('cadastro');

    if (salvo) {
      this.contaCadastrada = new Cadastro(
        salvo.nome,
        salvo.cpf,
        salvo.email,
        salvo.dataNascimento,
        salvo.genero,
        salvo.senha,
        salvo.logradouro,
        salvo.numero,
        salvo.bairro,
        salvo.cidade,
        salvo.estado,
        salvo.cep,
        salvo.foto || ''
      );
    }
  }

  async salvarCadastro(cadastro: Cadastro): Promise<void> {
    this.contaCadastrada = cadastro;

    const dados = {
      nome: cadastro.getNome(),
      cpf: cadastro.getCpf(),
      email: cadastro.getEmail(),
      dataNascimento: cadastro.getDataNascimento(),
      genero: cadastro.getGenero(),
      senha: cadastro.getSenha(),
      logradouro: cadastro.getLogradouro(),
      numero: cadastro.getNumero(),
      bairro: cadastro.getBairro(),
      cidade: cadastro.getCidade(),
      estado: cadastro.getEstado(),
      cep: cadastro.getCep(),
      foto: cadastro.getFoto()
    };

    await this.storage.set('cadastro', dados);
  }

  async obterCadastro(): Promise<Cadastro | null> {
    if (this.contaCadastrada) {
      return this.contaCadastrada;
    }

    const salvo = await this.storage.get('cadastro');

    if (!salvo) {
      return null;
    }

    this.contaCadastrada = new Cadastro(
      salvo.nome,
      salvo.cpf,
      salvo.email,
      salvo.dataNascimento,
      salvo.genero,
      salvo.senha,
      salvo.logradouro,
      salvo.numero,
      salvo.bairro,
      salvo.cidade,
      salvo.estado,
      salvo.cep,
      salvo.foto || ''
    );

    return this.contaCadastrada;
  }

  async removerCadastro(): Promise<void> {
    this.contaCadastrada = null;
    await this.storage.remove('cadastro');
  }
}
