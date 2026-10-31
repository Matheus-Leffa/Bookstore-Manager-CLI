export class AutorNameInvalidError extends Error{
    constructor(){
        super(`Nome do autor é obrigatório`);

        this.name = "AutorNameInvalidError"
    }
}