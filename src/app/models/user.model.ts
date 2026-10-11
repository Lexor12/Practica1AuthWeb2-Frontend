//Estructura de un usuario completo
export interface User {
    id?:number;//Opcional por si se crea un usuario desde el frontend sin id
    name:string;
    email:string;
    password:string
    rol?:string//Por la misma razón que el id
}