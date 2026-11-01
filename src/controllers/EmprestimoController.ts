import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoService } from "../services/EmprestimoService";

export class EmprestimoController {
    private service: EmprestimoService;

    constructor(service: EmprestimoService) {
        this.service = service;
    }

    public async realizarEmprestimo(clienteId: number, livroId: number): Promise<Emprestimo> {
        return await this.service.realizarEmprestimo(clienteId, livroId);
    }

    public async realizarDevolucao(idEmprestimo: number): Promise<void> {
        await this.service.realizarDevolucao(idEmprestimo);
    }

    public async listarEmprestimos(): Promise<Emprestimo[]> {
        return await this.service.listarEmprestimos();
    }

    public async buscarEmprestimoPeloId(id: number): Promise<Emprestimo> {
        return await this.service.buscarEmprestimoPeloId(id);
    }
}