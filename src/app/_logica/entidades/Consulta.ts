export class Consulta {
    private consultaPara: string;
    private nomePaciente: string;
    private cpfPaciente: string;
    private cepPaciente: string;
    private generoPaciente: string;
    private dataNascimentoPaciente: string;
    private especialidade: string;
    private medico: string;
    private dataConsulta: string;
    private horarioConsulta: string;
    private status: 'Agendada' | 'Cancelada';
    private cpfUsuario: string;

    constructor(
        consultaPara: string,
        nomePaciente: string,
        cpfPaciente: string,
        cepPaciente: string,
        generoPaciente: string,
        dataNascimentoPaciente: string,
        especialidade: string,
        medico: string,
        dataConsulta: string,
        horarioConsulta: string,
        status: 'Agendada' | 'Cancelada' = 'Agendada',
        cpfUsuario: string
    ) {
        this.consultaPara = consultaPara;
        this.nomePaciente = nomePaciente;
        this.cpfPaciente = cpfPaciente;
        this.cepPaciente = cepPaciente;
        this.generoPaciente = generoPaciente;
        this.dataNascimentoPaciente = dataNascimentoPaciente;
        this.especialidade = especialidade;
        this.medico = medico;
        this.dataConsulta = dataConsulta;
        this.horarioConsulta = horarioConsulta;
        this.status = status;
        this.cpfUsuario = cpfUsuario || cpfPaciente;
    }

    getConsultaPara() { return this.consultaPara; }
    getNomePaciente() { return this.nomePaciente; }
    getCpfPaciente() { return this.cpfPaciente; }
    getCepPaciente() { return this.cepPaciente; }
    getGeneroPaciente() { return this.generoPaciente; }
    getDataNascimentoPaciente() { return this.dataNascimentoPaciente; }
    getEspecialidade() { return this.especialidade; }
    getMedico() { return this.medico; }
    getDataConsulta() { return this.dataConsulta; }
    getHorarioConsulta() { return this.horarioConsulta; }
    getStatus(): 'Agendada' | 'Cancelada' { return this.status; }
    getCpfUsuario(): string { return this.cpfUsuario; }

    setStatus(status: 'Agendada' | 'Cancelada') {
        this.status = status;
    }
}
