export class EmprestimoNotFoundError extends Error{
    constructor(id: number){
        super(`Emprestimo ${id} não encontrado`);

        this.name = "EmprestimoNotFoundError"
    }
}