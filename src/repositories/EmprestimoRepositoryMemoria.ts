import { Cliente } from "../models/Clientes";
import { Emprestimo } from "../models/Emprestimo";
import { Livro } from "../models/Livro";
import { EmprestimoRepository } from "./EmprestimoRepository";

export class EmprestimoRepositoryMemoria implements EmprestimoRepository{
    private emprestimos: Emprestimo[] = [];


    async realizarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
        this.emprestimos.push(emprestimo);
        
        return emprestimo;
    }

    async realizarDevolucao(idEmprestimo: number): Promise<void> {
        const emprestimo = await this.consultarEmprestimoPeloId(idEmprestimo);

        if (emprestimo === undefined) {
            throw new Error("Empréstimo não encontrado.");
        }

        emprestimo.registrarDevolucao();
    }

    async consultarEmprestimoPeloId(idEmprestimo: number): Promise<Emprestimo | undefined> {
        return this.emprestimos.find(emprestimo => emprestimo.getId() === idEmprestimo);
    }

    
    
}