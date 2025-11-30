export interface Medico {
    nome: string;
    especialidade: string;
    crm: string;
    foto: string;
    status: string;
}

export const lista_medicos: Medico[] = [
    {
        nome: 'Dr. João Silva',
        especialidade: 'Cardiologia',
        crm: '1245-SP',
        foto: 'assets/img/JoaoSilva.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dr. Limeira Silva',
        especialidade: 'Cardiologia',
        crm: '3145-SP',
        foto: 'assets/img/LimeiraSilva.jpg',
        status: 'Indisponível'
    },
    {
        nome: 'Dra. Ana Costa',
        especialidade: 'Cardiologia',
        crm: '2345-PR',
        foto: 'assets/img/AnaCosta.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dr. Pedro Almeida',
        especialidade: 'Ortopedia',
        crm: '3456-SP',
        foto: 'assets/img/PedroAlmeida.png',
        status: 'Indisponível'
    },
    {
        nome: 'Dr. Diogo Bezerra',
        especialidade: 'Ortopedia',
        crm: '5456-PE',
        foto: 'assets/img/DiogoBezerra.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dra. Pedrina Chaves',
        especialidade: 'Ortopedia',
        crm: '4321-TO',
        foto: 'assets/img/PedrinaChaves.jpg',
        status: 'Indisponível'
    },
    {
        nome: 'Dra. Michele Silveira',
        especialidade: 'Neurologia',
        crm: '1526-SE',
        foto: 'assets/img/MicheleSilveira.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dra. Júlia Coelho',
        especialidade: 'Neurologia',
        crm: '1526-ES',
        foto: 'assets/img/JuliaCoelho.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dr. Antonio Lopes',
        especialidade: 'Neurologia',
        crm: '4271-RR',
        foto: 'assets/img/AntonioLopes.jpg',
        status: 'Indisponível'
    },
    {
        nome: 'Dra. Ana Maria Flores',
        especialidade: 'Pediatria',
        crm: '8496-BA',
        foto: 'assets/img/AnaFlores.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dra. Josefa Carvalho',
        especialidade: 'Pediatria',
        crm: '8496-AL',
        foto: 'assets/img/JosefaCarvalho.jpg',
        status: 'Indisponível'
    },
    {
        nome: 'Dr. João Marques',
        especialidade: 'Pediatria',
        crm: '8576-AM',
        foto: 'assets/img/JoaoMarques.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dr. Lucas Ramos',
        especialidade: 'Oftalmologia',
        crm: '3426-RJ',
        foto: 'assets/img/LucasRamos.jpg',
        status: 'Indisponível'
    },
    {
        nome: 'Dr. Carlos Drummont',
        especialidade: 'Oftalmologia',
        crm: '9426-PB',
        foto: 'assets/img/CarlosDrummont.jpg',
        status: 'Disponível'
    },
    {
        nome: 'Dra. Marta Moura',
        especialidade: 'Oftalmologia',
        crm: '6426-RN',
        foto: 'assets/img/MartaMoura.jpg',
        status: 'Disponível'
    },


];
