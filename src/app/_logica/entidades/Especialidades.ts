export class Especialidade {

    private nome: string;
    private descricao: string;
    private tipo: string;

    constructor(
        nome: string = '',
        descricao: string = '',
        tipo: string = ''
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
    }

    public getNome(): string {
        return this.nome;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }
}
