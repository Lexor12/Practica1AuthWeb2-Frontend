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
  tieneToken = signal<boolean>(false);
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    if(this.authService.estaAutenticado()){
      this.tieneToken.set(true)
    }

  }
  cerrarSesion(){
    this.authService.cerrarSesion()
    this.router.navigate(['/login'])
  }
}
