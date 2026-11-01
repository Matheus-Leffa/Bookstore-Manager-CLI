import { Autor } from "./Autor";

export class Livro{
    private static proximoId: number = 1;

    private id: number;
    private nome: string;
    private isbn: string;
    private criado_em: Date;
    private autor: Autor;
    private esta_Disponivel: boolean;

    public constructor(nome: string, isbn: string, autor: Autor){
        this.id = Livro.proximoId++;
        this.nome = nome;
        this.isbn = isbn;
        this.criado_em = new Date();
        this.autor = autor;
        this.esta_Disponivel = true;
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

    public getAutor() : Autor{
        return this.autor;
    }

    public setAutor(autor : Autor): void {
        this.autor = autor;
    }

    public isDisponivel() : boolean{
        return this.esta_Disponivel;
    }

    public setDisponivel() : void {
        this.esta_Disponivel = !this.esta_Disponivel;
    }

    public definirDisponibilidade(disponivel: boolean) : void {
        this.esta_Disponivel = disponivel;
    }
}