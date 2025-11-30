import { Component } from '@angular/core';
import { lista_especialidades } from './especialidades-dados';
import { Especialidade } from '../_logica/entidades/Especialidades';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.page.html',
  styleUrls: ['./especialidades.page.scss'],
  standalone: false,
})
export class EspecialidadesPage  {

  especialidades: Especialidade[] = [];
  especialidadesFiltradas: Especialidade[] = [];

  termoBusca = '';

  constructor() {
    this.especialidades = lista_especialidades;
    this.especialidadesFiltradas = this.especialidades;
  }

  filtrar() {
    const termo = this.termoBusca.toLowerCase().trim();

    if (!termo) {
      this.especialidadesFiltradas = this.especialidades;
      return;
    }

    this.especialidadesFiltradas = this.especialidades.filter(esp =>
      esp.getNome().toLowerCase().includes(termo)
    );
  }

  abrir(esp: Especialidade) {
    console.log('Especialidade selecionada:', esp);
  }
}
