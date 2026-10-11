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
  nombre = signal<string>('')
  rol = signal<string>('')

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.nombre.set(this.authService.obtenerNombre() ?? '')
    this.rol.set(this.authService.obtenerRol() ?? '')
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion()
    this.router.navigate(['/login'])
  }
}
