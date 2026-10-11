//Lo que se envía al backend al iniciar sesión
export interface LoginRequest {
    email: string;
    password: string;
}