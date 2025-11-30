export class Login {
    email: string;
    senha: string;
    mostrarSenha: boolean;

    constructor(
        email: string = '',
        senha: string = '',
        mostrarSenha: boolean = false
    ) {
        this.email = email;
        this.senha = senha;
        this.mostrarSenha = mostrarSenha;
    }
}
