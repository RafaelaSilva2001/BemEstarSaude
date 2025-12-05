import { Storage } from '@ionic/storage-angular';
import { Cadastro } from '../entidades/Cadastro';

export class CadastroCRUD {

  private usuarios: Cadastro[] = [];

  constructor(private storage: Storage) { }

  async inicializar(): Promise<void> {
    await this.storage.create();
    await this.carregarUsuarios();
  }

  private async carregarUsuarios(): Promise<void> {
    const salvos = await this.storage.get('usuarios');
    this.usuarios = [];

    if (salvos && Array.isArray(salvos)) {
      for (const salvo of salvos) {
        this.usuarios.push(new Cadastro(
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
        ));
      }
    } else {
      // Migração ou fallback para usuário único antigo se necessário
      const unicoAntigo = await this.storage.get('cadastro');
      if (unicoAntigo) {
        this.usuarios.push(new Cadastro(
          unicoAntigo.nome,
          unicoAntigo.cpf,
          unicoAntigo.email,
          unicoAntigo.dataNascimento,
          unicoAntigo.genero,
          unicoAntigo.senha,
          unicoAntigo.logradouro,
          unicoAntigo.numero,
          unicoAntigo.bairro,
          unicoAntigo.cidade,
          unicoAntigo.estado,
          unicoAntigo.cep,
          unicoAntigo.foto || ''
        ));
        // Salvar no novo formato e remover o antigo
        await this.salvarLista();
        await this.storage.remove('cadastro');
      }
    }
  }

  async salvarCadastro(cadastro: Cadastro): Promise<void> {
    // Verifica se já existe e atualiza, ou adiciona novo
    const index = this.usuarios.findIndex(u => u.getCpf() === cadastro.getCpf());

    if (index >= 0) {
      this.usuarios[index] = cadastro;
    } else {
      this.usuarios.push(cadastro);
    }

    await this.salvarLista();
  }

  private async salvarLista(): Promise<void> {
    const dados = this.usuarios.map(u => ({
      nome: u.getNome(),
      cpf: u.getCpf(),
      email: u.getEmail(),
      dataNascimento: u.getDataNascimento(),
      genero: u.getGenero(),
      senha: u.getSenha(),
      logradouro: u.getLogradouro(),
      numero: u.getNumero(),
      bairro: u.getBairro(),
      cidade: u.getCidade(),
      estado: u.getEstado(),
      cep: u.getCep(),
      foto: u.getFoto()
    }));

    await this.storage.set('usuarios', dados);
  }

  async obterCadastroPorCpf(cpf: string): Promise<Cadastro | null> {
    return this.usuarios.find(u => u.getCpf() === cpf) || null;
  }

  async obterCadastroPorEmail(email: string): Promise<Cadastro | null> {
    return this.usuarios.find(u => u.getEmail() === email) || null;
  }

  async autenticar(email: string, senha: string): Promise<Cadastro | null> {
    const usuario = this.usuarios.find(u =>
      (u.getEmail() || '').trim().toLowerCase() === email.trim().toLowerCase() &&
      (u.getSenha() || '').trim() === senha.trim()
    );
    return usuario || null;
  }
}
