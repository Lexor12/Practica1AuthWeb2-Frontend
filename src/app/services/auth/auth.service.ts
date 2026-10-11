import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';
import { LoginRequest } from '../../models/loginRequest.model';
import { registerRequest } from '../../models/registerRequest.model';
import { isPlatformBrowser } from '@angular/common';
import { Inject,PLATFORM_ID } from '@angular/core';

//Este service maneja la comunicación con el backend y la sesión guardada en el navegador
@Injectable({
  providedIn: 'root',// una sola instancia para toda la app, creada la primera vez que se inyecta
})
export class AuthService {
  private url='http://localhost:3000/api/auth'//Dirección base del backend
  //PLATFORM_ID sirve para saber si el código corre en el navegador o en el servidor (SSR), esto lo usamos porque me daba unos conflictos con lo de localStorage
  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object){}

  //POST /login ->va a la ruta del login para obtener un token y datos en caso de que sea correcto
  login(loginRequest:LoginRequest):Observable<LoginResponse | undefined>{
    return this.http.post<LoginResponse>(`${this.url}/login`,loginRequest)
  }
  //POST /register -> en la práctica se manda null porque el backend crea usuarios fijos
  register(registerRequest:registerRequest|null):Observable<any>{
    return this.http.post(`${this.url}/register`,registerRequest)
  }
  //Guarda la sesión en localStorage (solo en el navegador, en el servidor localStorage no existe)
  saveSession(token:string,rol:string,name:string){
    if(!isPlatformBrowser(this.platformId))return;
    localStorage.setItem('token',token)
    localStorage.setItem('rol',rol)
    localStorage.setItem('name',name)
  }
  //Los siguientes tres leen lo guardado; devuelven null si no hay nada o si corre en el servidor
  getToken(){
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('token')
    }
    return null
  }
  getRole(){
    if(isPlatformBrowser(this.platformId))
    return localStorage.getItem('rol')
    return null
  }
  getName(){
    if(isPlatformBrowser(this.platformId))return localStorage.getItem('name')
    return null
  }
  //Revisa si el rol del usuario está dentro de los roles permitidos de la ruta
  hasRole(allowedRoles: string[]): boolean {
    if(!isPlatformBrowser(this.platformId))return false;
    const rol = this.getRole()
    return rol !== null && allowedRoles.includes(rol)
  }
  //Hay sesión si existe un token guardado (no revisa si ya expiró)
  isAuthenticated():Boolean{
    if(isPlatformBrowser(this.platformId))return this.getToken()!==null;
    return false
  }
  //Cierra sesión borrando todo lo guardado
  logout() {
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