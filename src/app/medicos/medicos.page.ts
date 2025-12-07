import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lista_medicos, Medico } from './medicos-dados';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
  standalone: false,
})
export class MedicosPage {

  textoBusca = '';
  cor = '';

  medicos: Medico[] = lista_medicos;
  medicosFiltrados: Medico[] = [];

  constructor(private route: ActivatedRoute) {

    this.medicosFiltrados = [...this.medicos];

    this.route.queryParams.subscribe(params => {
      const esp = params['especialidade'];

      if (esp) {
        this.filtrarPorEspecialidade(esp);
      } else {
        this.medicosFiltrados = [...this.medicos];
        this.textoBusca = '';
      }
    });
  }

  private filtrarPorEspecialidade(especialidade: string) {
    this.textoBusca = especialidade; 

    this.medicosFiltrados = this.medicos.filter(medico =>
      medico.especialidade.toLowerCase() === especialidade.toLowerCase()
    );
  }

  filtrarMedicos() {
    const texto = this.textoBusca.toLowerCase().trim();

    if (!texto) {
      this.medicosFiltrados = [...this.medicos];
      return;
    }

    this.medicosFiltrados = this.medicos.filter(medico =>
      medico.nome.toLowerCase().includes(texto) ||
      medico.especialidade.toLowerCase().includes(texto) ||
      medico.crm.toLowerCase().includes(texto)
    );
  }

  estiloStatus(status: string): string {
    return status === 'Indisponível' ? 'danger' : 'success';
  }
}
