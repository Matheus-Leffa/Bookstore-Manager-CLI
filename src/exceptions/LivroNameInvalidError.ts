export class LivroNameInvalidError extends Error{
    constructor(){
        super(`Nome do livro é obrigatório`);

        this.name = "LivroNameInvalidError"
    }
}
