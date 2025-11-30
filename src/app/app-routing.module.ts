import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';
import { AppRoutes } from './routes/app-routes';

const routes: Routes = [
  {
    path: AppRoutes.TABS,
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.LOGIN,
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: AppRoutes.CADASTRO,
    loadChildren: () =>
      import('./cadastro/cadastro.module').then(m => m.CadastroPageModule),
    
  },
  {
    path: '',
    redirectTo: AppRoutes.LOGIN,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.ESPECIALIDADES,
    loadChildren: () => import('./especialidades/especialidades.module').then(m => m.EspecialidadesPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
