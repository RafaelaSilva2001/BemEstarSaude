import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AppRoutes } from '../routes/app-routes';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: AppRoutes.HOME,
        loadChildren: () =>
          import('../home/home.module')
            .then(m => m.HomePageModule),
      },
      {
        path: AppRoutes.CONSULTA,
        loadChildren: () =>
          import('../consulta/consulta.module')
            .then(m => m.ConsultaPageModule),
      },
      {
        path: AppRoutes.MEDICOS,
        loadChildren: () =>
          import('../medicos/medicos.module')
            .then(m => m.MedicosPageModule),
      },
      {
        path: AppRoutes.PACIENTE,
        loadChildren: () =>
          import('../paciente/paciente.module')
            .then(m => m.PacientePageModule),
      },

      {
        path: AppRoutes.ESPECIALIDADES,
        loadChildren: () =>
          import('../especialidades/especialidades.module')
            .then(m => m.EspecialidadesPageModule),
      },

      {
        path: AppRoutes.AGENDAR_CONSULTA,
        loadChildren: () =>
          import('../agendar-consulta/agendar-consulta.module')
            .then(m => m.AgendarConsultaPageModule),
      },

      {
        path: '',
        redirectTo: AppRoutes.HOME,
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
