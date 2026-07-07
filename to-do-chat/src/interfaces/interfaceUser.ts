
export interface signUpUser {
    nome: string,
    cpf:string,
    email: string,
    idade:number,
    pass: string,}

export interface completeUserData {
    cnpj:string,
    cpf:string
    idade:number,
}

export interface UserLocalStorage {
    id:number,
    nome:string,
    email:string
}

export interface cookieUser {
    id:number,
    companyId:number|null,
    role:string
}



export interface UsersInCompany {
    id:number,
    nome:string,
    email:string,
    cpf:string|null,
    role:string,
    idade:string|null,

}

export interface UserComplete {
    id:number,
    nome:string,
    email:string,
    companyId:number|null,
    cpf:string|null,
    createdAt:string,
    idade:number|null,
    role:string,
    status:string,
}


