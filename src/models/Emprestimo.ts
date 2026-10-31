import { Cliente } from "./Clientes";
import { Livro } from "./Livro";

export class Emprestimo{
    private static proximoId: number = 1;

    private id: number;
    private data_emprestimo: Date;
    private data_devolucao_prevista: Date;
    private data_devolucao_real: Date | null;
    private cliente: Cliente;
    private livro: Livro;

    public constructor(data_devolucao_prevista: Date, cliente: Cliente, livro: Livro){
        this.id = Emprestimo.proximoId++;
        this.data_emprestimo = new Date();
        this.data_devolucao_prevista = data_devolucao_prevista;
        this.data_devolucao_real = null;
        this.cliente = cliente;
        this.livro = livro;
    }

    public getCliente() : Cliente{
        return this.cliente;
    }

    public getLivro() : Livro{
        return this.livro;
    }
}