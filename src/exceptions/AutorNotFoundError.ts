export class AutorNotFoundError extends Error{
    constructor(id: number){
        super(`Autor ${id} não encontrado`);

        this.name = "AutorNotFoundError"
    }
}