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
  //signal = variable reactiva, la cual cuando cambia actualiza la pantalla
  errorMessage = signal<string>('')
  //Guardan lo que el usuario va escribiendo en los inputs
  email = signal<string>('');
  password = signal<string>('');
  constructor(private authservice:AuthService,private router: Router){}
  //Se ejecuta en cada tecla del input de correo
  updateEmail(event: Event) {
    this.email.set((event.target as HTMLInputElement).value);
  }
  //Se ejecuta en cada tecla del input de contraseña
  updatePassword(event: Event) {
    this.password.set((event.target as HTMLInputElement).value);
  }
  //Se ejecuta al enviar el formulario
  signIn(event:Event): void {
    event.preventDefault()//Evitamos que la página reinicie
    const request:LoginRequest = {email: this.email(), password: this.password() }
    if(request){
      this.authservice.login(request).subscribe({
      next: (result) => {
        if (result?.token) {
          this.authservice.saveSession(result.token, result.rol, result.name)
          this.router.navigate(['/home'])
        }
      },
      error: ()=>{
        this.errorMessage.set('Invalid email or password')
      }
    })
    }
    
  }
  //Botón "Crear", pide al backend que cree los usuarios predefinidos (no manda datos)
  createDefaultUser(){
    this.authservice.register(null).subscribe({
      next: (res) => alert('User created'),
      error: (err) => alert('Error registering'),
    });
  }
}
