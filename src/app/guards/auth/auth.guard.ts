import { CanActivateFn } from '@angular/router';

//Importamos lo siguiente:
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  //Aqui obtenemos el servicio de autenticacion
  const authService=inject(AuthService)//Usamos inject , ya que es una funcion que permite el uso de servicios o guardianes sin necesidad de tener que declararlos desde el constructor
  //Obtenemos el servicio para la navegacion
  const router = inject(Router)
  //Verificamos si el usuario posee una sesion (Autenticacion)
  if(authService.isAuthenticated()){
    return true;//Si devuelve true es porque permitimos el acceso
  }
  //En caso de que no exista un acceso, lo enviamos a Login
  return router.createUrlTree(['/login'])
};
