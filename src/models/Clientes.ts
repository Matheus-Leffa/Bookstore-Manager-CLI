export class Cliente{
    private static proximoId: number = 1;

    private id: number;
    private nome: string;
    private cpf: string;
    private telefone: string;
    private criado_em: Date;

    public constructor(nome: string, cpf: string, telefone: string){
        this.id = Cliente.proximoId++;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
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

    public getCpf() : string{
        return this.cpf;
    }

    public setCpf(cpf: string) : void {
        this.cpf = cpf;
    }

    public getTelefone() : string{
        return this.telefone;
    }

    public setTelefone(telefone: string) : void {
        this.telefone = telefone;
    }
}