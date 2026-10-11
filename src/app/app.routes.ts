import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


//Justo aquí immportamos nuestro guardian
import { roleGuardGuard } from './guards/role/role.guard';
import { authGuardGuard } from './guards/auth/auth.guard';

//Aquí importamos nuestros componentes
import { ForbiddenComponent } from './components/forbidden/forbidden.component/forbidden.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    //Ruta Pública
    {
        path:'',
        redirectTo:'login',//Significa "si yo busco esta URL, me deberia de mandar al componente si o"
        pathMatch:'full'
    },
    {   
        path:'forbidden',
        component:ForbiddenComponent
    },
    //Ruta Pública
    {
        path:'login',
        component:LoginComponent
    },
    //Ruta Protegida
    {
        path:'home',
        component:HomeComponent,
        canActivate:[authGuardGuard,roleGuardGuard],
        data:{ roles: ['admin', 'cajero'] }
    }
];
