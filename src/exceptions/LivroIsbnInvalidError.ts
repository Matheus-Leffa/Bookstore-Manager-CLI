export class LivroIsbnInvalidError extends Error{
    constructor(){
        super(`Isbn inválido.`);

        this.name = "LivroIsbnInvalidError"
    }
}