export class ClienteTelefoneInvalidError extends Error{
    constructor(){
        super(`Telefone do Cliente é obrigatório`);

        this.name =  "ClienteTelefoneInvalidError"
    }
}