export class Autor{
    private static proximoId: number = 1;

    private id: number;
    private nome: string;
    private nacionalidade: string;
    private criado_em: Date;

    public constructor(nome: string, nacionalidade: string){
        this.id = Autor.proximoId++;
        this.nome = nome;
        this.nacionalidade = nacionalidade;
        this.criado_em = new Date();
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

    public getNacionalidade() : string {
        return this.nacionalidade;
    }

    public setNacionalidade(nacionalidade: string) : void {
        this.nacionalidade = nacionalidade;
    }
}