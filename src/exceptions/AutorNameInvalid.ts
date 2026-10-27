export class AutorNameInvalid extends Error{
    constructor(){
        super(`Nome do autor é obrigatório`);

        this.name = "AutorNameInvalid"
    }
}