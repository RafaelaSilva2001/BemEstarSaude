export class Cadastro {

    private nome: string;
    private cpf: string;
    private email: string;
    private dataNascimento: string;
    private genero: string;
    private senha: string;

    private logradouro: string;
    private numero: string;
    private bairro: string;
    private cidade: string;
    private estado: string;
    private cep: string;

    private foto: string; // Base64 string

    constructor(
        nome: string,
        cpf: string,
        email: string,
        dataNascimento: string,
        genero: string,
        senha: string,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        estado: string,
        cep: string,
        foto: string = '' // Default empty
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.senha = senha;

        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.foto = foto;
    }

    public getNome(): string {
        return this.nome;
    }
    public getCpf(): string {
        return this.cpf;
    }
    public getEmail(): string {
        return this.email;
    }
    public getDataNascimento(): string {
        return this.dataNascimento;
    }
    public getGenero(): string {
        return this.genero;
    }
    public getSenha(): string {
        return this.senha;
    }

    public getLogradouro(): string {
        return this.logradouro;
    }
    public getNumero(): string {
        return this.numero;
    }
    public getBairro(): string {
        return this.bairro;
    }
    public getCidade(): string {
        return this.cidade;
    }
    public getEstado(): string {
        return this.estado;
    }
    public getCep(): string {
        return this.cep;
    }
    public getFoto(): string {
        return this.foto;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }
    public setEmail(email: string): void {
        this.email = email;
    }
    public setDataNascimento(data: string): void {
        this.dataNascimento = data;
    }
    public setGenero(genero: string): void {
        this.genero = genero;
    }
    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public setLogradouro(logradouro: string): void {
        this.logradouro = logradouro;
    }
    public setNumero(numero: string): void {
        this.numero = numero;
    }
    public setBairro(bairro: string): void {
        this.bairro = bairro;
    }
    public setCidade(cidade: string): void {
        this.cidade = cidade;
    }
    public setEstado(estado: string): void {
        this.estado = estado;
    }
    public setCep(cep: string): void {
        this.cep = cep;
    }
    public setFoto(foto: string): void {
        this.foto = foto;
    }

}
