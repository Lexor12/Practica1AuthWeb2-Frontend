import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home.component',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  //Datos del usuario que se muestran en el mensaje de bienvenida
  name = signal<string>('')
  role = signal<string>('')

  constructor(private authService: AuthService, private router: Router) {}
  
  //ngOnInit se ejecuta una vez al cargar el componente, después del constructor (asi que ya hay injección de dependencias)
  //aquí leemos los datos guardados del token sí aplica
  ngOnInit(): void {
    this.name.set(this.authService.getName() ?? '')
    this.role.set(this.authService.getRole() ?? '')
  }
  //Borra la sesión y regresa al login
  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
