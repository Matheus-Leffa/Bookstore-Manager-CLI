export class LivroIndisponivelError extends Error {
    constructor(id: number) {
        super(`Livro ${id} está indisponível`);

        this.name = "LivroIndisponivelError";
    }
}
