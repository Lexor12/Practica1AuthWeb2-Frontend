import { Component, OnInit, signal, Signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden.component',
  imports: [RouterLink],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css',
})
export class ForbiddenComponent implements OnInit {
  //Indica si hay sesión, para mostrar el botón de cerrar sesión solo cuando tenga sentido
  hasToken = signal<boolean>(false);
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.hasToken.set(true)
    }

  }
  //Borra la sesión y regresa al login
  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
