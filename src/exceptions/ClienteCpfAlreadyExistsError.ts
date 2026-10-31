export class ClienteCpfAlreadyExistsError extends Error{
    constructor(){
        super(`CPF já cadastrado no sistema.`);

        this.name = "ClienteCpfAlreadyExistsError"
    }
}