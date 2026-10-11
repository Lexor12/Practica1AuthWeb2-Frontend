import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';


export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router=inject(Router)

  //Obtener los roles permitidos en la ruta
  const allowedRoles:string[]= route.data['roles']??[]

  //Verificar que exista una sesion
  if(!authService.isAuthenticated()){
    return router.createUrlTree(['/login'])
  }
  //Verificar si el usuario tiene permisos
  if(authService.hasRole(allowedRoles)){
    return true
  }
  return router.createUrlTree(['/forbidden']);
};
