export class Medico {
    private nome: string;
    private crm: string;
    private especialidade: string;
    private foto: string;
    private status: string;

    constructor(
        nome: string,
        crm: string,
        especialidade: string,
        foto: string,
        status: string
    ) {
        this.nome = nome;
        this.crm = crm;
        this.especialidade = especialidade;
        this.foto = foto;
        this.status = status;
    }

    public getNome(): string {
        return this.nome;
    }

    public getCrm(): string {
        return this.crm;
    }

    public getEspecialidade(): string {
        return this.especialidade;
    }

    public getFoto(): string {
        return this.foto;
    }

    public getStatus(): string {
        return this.status;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setCrm(crm: string): void {
        this.crm = crm;
    }

    public setEspecialidade(especialidade: string): void {
        this.especialidade = especialidade;
    }

    public setFoto(foto: string): void {
        this.foto = foto;
    }

    public setStatus(status: string): void {
        this.status = status;
    }
}
