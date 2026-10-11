import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../models/loginRequest.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login.component',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  mensajeError = signal<string>('')

  email = signal<string>('');
  password = signal<string>('');
  constructor(private authservice:AuthService,private router: Router){}

  actualizarEmail(event: Event) {
    this.email.set((event.target as HTMLInputElement).value);
  }

  actualizarPassword(event: Event) {
    this.password.set((event.target as HTMLInputElement).value);
  }

  iniciarSesion(event:Event): void {
    event.preventDefault()
    const request:LoginRequest = {email: this.email(), password: this.password() }
    if(request){
      this.authservice.login(request).subscribe({
      next: (result) => {
        if (result?.token) {
          this.authservice.guardarDatos(result.token, result.rol, result.name)
          this.router.navigate(['/home'])
        }
      },
      error: ()=>{
        this.mensajeError.set('Correo o contraseña incorrectos')
      }
    })
    }
    
  }
  crearUsuarioPorDefecto(){
    this.authservice.register(null).subscribe({
      next: (res) => alert('Usuario creado'),
      error: (err) => alert('Error al registrar'),
    });
  }
}
