import { Storage } from '@ionic/storage-angular';
import { Consulta } from '../entidades/Consulta';

export class ConsultaCRUD {

    private consultas: Consulta[] = [];

    constructor(private storage: Storage) { }

    async inicializar(): Promise<void> {
        await this.storage.create();
        await this.carregarConsultas();
    }

    private async carregarConsultas(): Promise<void> {
        const salvo: any[] = await this.storage.get('consultas');

        this.consultas = [];

        if (salvo && salvo.length > 0) {
            for (const c of salvo) {

                const status: 'Agendada' | 'Cancelada' =
                    c.status === 'Cancelada' ? 'Cancelada' : 'Agendada';

                const consulta = new Consulta(
                    c.consultaPara,
                    c.nomePaciente,
                    c.cpfPaciente,
                    c.cepPaciente,
                    c.generoPaciente,
                    c.dataNascimentoPaciente,
                    c.especialidade,
                    c.medico,
                    c.dataConsulta,
                    c.horarioConsulta,
                    status,
                    c.cpfUsuario             
                );

                this.consultas.push(consulta);
            }
        }
    }

    async obterConsultas(): Promise<Consulta[]> {
        if (this.consultas.length === 0) {
            await this.carregarConsultas();
        }
        return this.consultas;
    }
}
