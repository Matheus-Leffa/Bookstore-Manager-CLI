export class LivroIsbnAlreadyExistsError extends Error{
    constructor(){
        super(`Isbn já cadastrado no sistema.`);

        this.name = "LivroIsbnAlreadyExistsError"
    }
}