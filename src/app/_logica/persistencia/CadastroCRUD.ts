import { Storage } from '@ionic/storage-angular';
import { Cadastro } from '../entidades/Cadastro';

export class CadastroCRUD {

  private contaCadastrada: Cadastro | null = null;

  private usuarios: Cadastro[] = [];

  constructor(private storage: Storage) { }

  async inicializar(): Promise<void> {
    await this.storage.create();

    const dadosSalvos = await this.storage.get('usuarios');
    this.usuarios = [];

    if (dadosSalvos && Array.isArray(dadosSalvos)) {
      for (const usuario of dadosSalvos) {
        const cadastro = new Cadastro(
          usuario.nome,
          usuario.cpf,
          usuario.email,
          usuario.dataNascimento,
          usuario.genero,
          usuario.senha,
          usuario.logradouro,
          usuario.numero,
          usuario.bairro,
          usuario.cidade,
          usuario.estado,
          usuario.cep,
          usuario.foto || ''
        );
        this.usuarios.push(cadastro);
      }
    }

    this.contaCadastrada = null;
    for (const usuario of this.usuarios) {
      this.contaCadastrada = usuario;
      break;
    }
  }

  private async salvar(): Promise<void> {
    const salvarUsuarios: any[] = [];

    for (const usuario of this.usuarios) {
      salvarUsuarios.push({
        nome: usuario.getNome(),
        cpf: usuario.getCpf(),
        email: usuario.getEmail(),
        dataNascimento: usuario.getDataNascimento(),
        genero: usuario.getGenero(),
        senha: usuario.getSenha(),
        logradouro: usuario.getLogradouro(),
        numero: usuario.getNumero(),
        bairro: usuario.getBairro(),
        cidade: usuario.getCidade(),
        estado: usuario.getEstado(),
        cep: usuario.getCep(),
        foto: usuario.getFoto()
      });
    }

    await this.storage.set('usuarios', salvarUsuarios);
  }

  async salvarCadastro(cadastro: Cadastro): Promise<void> {
    if (this.usuarios.length === 0 && !this.contaCadastrada) {
      await this.inicializar();
    }

    const novoCpf = cadastro.getCpf();
    const novosUsuarios: Cadastro[] = [];
    let cpfCadastrado = false;

    for (const usuario of this.usuarios) {
      if (!cpfCadastrado && usuario.getCpf() === novoCpf) {
        novosUsuarios.push(cadastro); 
        cpfCadastrado = true;
      } else {
        novosUsuarios.push(usuario);
      }
    }

    if (!cpfCadastrado) {
      novosUsuarios.push(cadastro); 
    }

    this.usuarios = novosUsuarios;
    this.contaCadastrada = cadastro;

    await this.salvar();
  }

  async obterCadastroPorCpf(cpf: string): Promise<Cadastro | null> {
    if (this.usuarios.length === 0 && !this.contaCadastrada) {
      await this.inicializar();
    }

    for (const usuario of this.usuarios) {
      if (usuario.getCpf() === cpf) {
        return usuario;
      }
    }

    return null;
  }

  async obterTodosCadastros(): Promise<Cadastro[]> {
    if (this.usuarios.length === 0 && !this.contaCadastrada) {
      await this.inicializar();
    }
    return this.usuarios;
  }

  async obterCadastro(): Promise<Cadastro | null> {
    if (this.contaCadastrada) {
      return this.contaCadastrada;
    }

    if (this.usuarios.length === 0) {
      await this.inicializar();
    }

    for (const usuario of this.usuarios) {
      this.contaCadastrada = usuario;
      break;
    }

    return this.contaCadastrada;
  }
}
