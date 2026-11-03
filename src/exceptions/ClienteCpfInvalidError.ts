export class ClienteCpfInvalidError extends Error{
    constructor(){
        super(`CPF do Cliente é obrigatório`);

        this.name =  "ClienteCpfInvalidError"
    }
}