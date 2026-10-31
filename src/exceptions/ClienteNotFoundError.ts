export class ClienteNotFoundError extends Error{
    constructor(id: number){
        super(`Cliente ${id} não encontrado`);

        this.name = "ClienteNotFoundError"
    }
}