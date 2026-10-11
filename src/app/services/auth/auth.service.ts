import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';
import { LoginRequest } from '../../models/loginRequest.model';
import { registerRequest } from '../../models/registerRequest.model';
import { isPlatformBrowser } from '@angular/common';
import { Inject,PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',// una sola instancia para toda la app, creada la primera vez que se inyecta
})
export class AuthService {
  private url='http://localhost:3000/api/auth'
  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object){}
  login(loginRequest:LoginRequest):Observable<LoginResponse | undefined>{
    return this.http.post<LoginResponse>(`${this.url}/login`,loginRequest)
  }
  register(registerRequest:registerRequest|null):Observable<any>{
    return this.http.post(`${this.url}/register`,registerRequest)
  }
  guardarDatos(token:string,rol:string,name:string){
    if(!isPlatformBrowser(this.platformId))return;
    localStorage.setItem('token',token)
    localStorage.setItem('rol',rol)
    localStorage.setItem('name',name)
  }
  obtenerToken(){
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('token')
    }
    return null
  }
  obtenerRol(){
    if(isPlatformBrowser(this.platformId))
    return localStorage.getItem('rol')
    return null
  }
  obtenerNombre(){
    if(isPlatformBrowser(this.platformId))return localStorage.getItem('name')
    return null
  }
  tieneRol(rolesPermitidos: string[]): boolean {
    if(!isPlatformBrowser(this.platformId))return false;
    const rol = this.obtenerRol()
    return rol !== null && rolesPermitidos.includes(rol)
  }
  estaAutenticado():Boolean{
    if(isPlatformBrowser(this.platformId))return this.obtenerToken()!==null;
    return false
  }
  cerrarSesion() {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('token')
      localStorage.removeItem('rol')
      localStorage.removeItem('name')
    }
  }

}

/*
ANTES DE DECLARAR AQUI HTTP CLIENTE, debemos 
declarar en app.config.ts
import { provideHttpClient } from '@angular/common/http';

para poder hacer consultas externas
*/