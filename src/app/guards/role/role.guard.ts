import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';


export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router=inject(Router)

  //Obtener los roles permitidos en la ruta
  const rolesPermitidos:string[]= route.data['roles']??[]

  //Verificar que exista una sesion
  if(!authService.estaAutenticado()){
    return router.createUrlTree(['/login'])
  }
  //Verificar si el usuario tiene permisos
  if(authService.tieneRol(rolesPermitidos)){
    return true
  }
  return router.createUrlTree(['/forbidden']);
};
