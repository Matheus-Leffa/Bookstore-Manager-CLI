import { Cliente } from "../models/Clientes";
import { Emprestimo } from "../models/Emprestimo";
import { Livro } from "../models/Livro";

export interface EmprestimoRepository{
    realizarEmprestimo(emprestimo: Emprestimo) : Promise<Emprestimo>;

    realizarDevolucao(idEmprestimo: number) : Promise<void>;

    consultarEmprestimoPeloId(idEmprestimo: number) : Promise<Emprestimo | undefined>;

}