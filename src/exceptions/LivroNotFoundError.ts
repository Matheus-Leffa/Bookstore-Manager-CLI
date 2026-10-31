export class LivroNotFoundError extends Error{
    constructor(id: number){
        super(`Livro ${id} não encontrado`);

        this.name = "LivroNotFoundError"
    }
}