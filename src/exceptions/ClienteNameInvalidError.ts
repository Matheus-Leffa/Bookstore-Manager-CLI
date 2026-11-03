export class ClienteNameInvalidError extends Error{
    constructor(){
        super(`Nome do Cliente é obrigatório`);

        this.name =  "ClienteNameInvalidError"
    }
}