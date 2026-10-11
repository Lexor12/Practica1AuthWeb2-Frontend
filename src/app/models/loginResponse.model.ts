//Lo que responde el backend si el login fue correcto
export interface LoginResponse {
    token: string;//JWT firmado por el servidor
    name:string
    rol:string
}