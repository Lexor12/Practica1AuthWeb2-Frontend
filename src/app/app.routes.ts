import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


//Justo aquí immportamos nuestro guardian
import { roleGuardGuard } from './guards/role/role.guard';
import { authGuardGuard } from './guards/auth/auth.guard';

//Aquí importamos nuestros componentes
import { ForbiddenComponent } from './components/forbidden/forbidden.component/forbidden.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    //Ruta Pública: si entran a la raíz, los mandamos al login
    {
        path:'',
        redirectTo:'login',//Significa "si yo busco esta URL, me deberia de mandar al componente si o"
        pathMatch:'full'//Solo aplica cuando la URL está completamente vacía
    },
    //Ruta Pública: pantalla de acceso no autorizado
    {   
        path:'forbidden',
        component:ForbiddenComponent
    },
    //Ruta Pública
    {
        path:'login',
        component:LoginComponent
    },
    //Ruta Protegida: pasa primero authGuard y luego roleGuard
    {
        path:'home',
        component:HomeComponent,
        canActivate:[authGuardGuard,roleGuardGuard],
        data:{ roles: ['admin', 'cajero'] }//Roles permitidos; el roleGuard lee esto con route.data['roles']
    }
];
