export class LivroNameAlreadyExistsError extends Error{
    constructor(){
        super(`Nome do livro já cadastrado no sistema.`);

        this.name = "LivroNameAlreadyExistsError"
    }
}