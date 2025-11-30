import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AppRoutes } from '../routes/app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) { }

  async canActivate(): Promise<boolean | UrlTree> {
    console.log('AuthGuard verificando rota');

    await this.storage.create();
    const estaAutenticado = await this.storage.get('sessao_logada');

    if (!estaAutenticado) {
      this.router.navigate([AppRoutes.LOGIN]);
      return false;
    }

    return true;
  }
}
