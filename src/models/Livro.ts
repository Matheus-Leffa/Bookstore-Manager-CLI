import { Autor } from "./Autor";

export class Livro{
    private static proximoId: number = 1;

    private id: number;
    private nome: string;
    private isbn: string;
    private criado_em: Date;
    private autor: Autor;

    public constructor(nome: string, isbn: string, autor: Autor){
        this.id = Livro.proximoId++;
        this.nome = nome;
        this.isbn = isbn;
        this.criado_em = new Date();
        this.autor = autor;
    }

    public getId() : number{
        return this.id;
    }

    public getNome() : string{
        return this.nome;
    }

    public setNome(nome: string) : void {
        this.nome = nome;
    }

    public getIsbn() : string {
        return this.isbn;
    }

    public setIsbn(nacionalidade: string) : void {
        this.isbn = nacionalidade;
    }
}