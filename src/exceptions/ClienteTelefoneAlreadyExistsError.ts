export class ClienteTelefoneAlreadyExistsError extends Error{
    constructor(){
        super(`Telefone já cadastrado no sistema.`);

        this.name = "ClienteTelefoneAlreadyExistsError"
    }
}