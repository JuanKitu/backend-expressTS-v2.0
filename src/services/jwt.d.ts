export interface User {
    idUsuario?: number,
    hash:string,
    salt:string,
    nombreUsuario:string,
    email:string
};

export interface UserToken {
    idUsuario?: number,
    userName?:string,
    email?:string,
    img?:string,
    google?:boolean
};
export interface TokenDecoded{
    decoded:any,
    error:boolean
}