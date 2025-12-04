import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module')
            .then(m => m.HomePageModule),
      },
      {
        path: 'consulta',
        loadChildren: () =>
          import('../consulta/consulta.module')
            .then(m => m.ConsultaPageModule),
      },
      {
        path: 'medicos',
        loadChildren: () =>
          import('../medicos/medicos.module')
            .then(m => m.MedicosPageModule),
      },
      {
        path: 'paciente',
        loadChildren: () =>
          import('../paciente/paciente.module')
            .then(m => m.PacientePageModule),
      },
      {
        path: 'especialidades',
        loadChildren: () =>
          import('../especialidades/especialidades.module')
            .then(m => m.EspecialidadesPageModule),
      },
      {
        path: 'agendar-consulta',
        loadChildren: () =>
          import('../agendar-consulta/agendar-consulta.module')
            .then(m => m.AgendarConsultaPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
