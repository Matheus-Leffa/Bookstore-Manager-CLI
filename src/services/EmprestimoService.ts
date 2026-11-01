import { LivroNotFoundError } from "../exceptions/LivroNotFoundError";
import { LivroIndisponivelError } from "../exceptions/LivroIndisponivelError";
import { ClienteNotFoundError } from "../exceptions/ClienteNotFoundError";
import { Cliente } from "../models/Clientes";
import { Emprestimo } from "../models/Emprestimo";
import { Livro } from "../models/Livro";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { EmprestimoNotFoundError } from "../exceptions/EmprestimoNotFoundError";

export class EmprestimoService{
    private emprestimoRepo: EmprestimoRepository;
    private livroRepo: LivroRepository;
    private clienteRepo: ClienteRepository;

    constructor(emprestimoRepo: EmprestimoRepository, livroRepo: LivroRepository, clienteRepo: ClienteRepository){
        this.emprestimoRepo = emprestimoRepo;
        this.livroRepo = livroRepo;
        this.clienteRepo = clienteRepo;
    }

    public async realizarEmprestimo(clienteId: number, livroId: number) : Promise<Emprestimo> {
        const livroEncontrado = await this.livroRepo.buscarPeloId(livroId);

        if (livroEncontrado === undefined) {
            throw new LivroNotFoundError(livroId);
        }

        if (!livroEncontrado.isDisponivel()) {
            throw new LivroIndisponivelError(livroId);
        }

        const clienteEncontrado = await this.clienteRepo.buscarPeloId(clienteId);

        if (clienteEncontrado === undefined) {
            throw new ClienteNotFoundError(clienteId);
        }

        const dataDevolucaoPrevista = new Date();
        dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 7);

        const emprestimo = new Emprestimo(
            dataDevolucaoPrevista,
            clienteEncontrado,
            livroEncontrado
        );

        const emprestimoRegistrado = await this.emprestimoRepo.realizarEmprestimo(emprestimo);
        livroEncontrado.setDisponivel();

        return emprestimoRegistrado;
    }

    public async realizarDevolucao(idEmprestimo: number): Promise<void> {
        const emprestimo = await this.emprestimoRepo.consultarEmprestimoPeloId(idEmprestimo);

        if (emprestimo === undefined) {
            throw new EmprestimoNotFoundError(idEmprestimo);
        }

        if (!emprestimo.estaAtivo()) {
            throw new Error(`Empréstimo ${idEmprestimo} já foi devolvido.`);
        }

        await this.emprestimoRepo.realizarDevolucao(idEmprestimo);

        const livro = emprestimo.getLivro();
        const livroAtualizado = await this.livroRepo.atualizarDisponibilidade(
            livro.getId(),
            true
        );

        if (livroAtualizado === undefined) {
            throw new LivroNotFoundError(livro.getId());
        }
    }

    public async listarEmprestimos(): Promise<Emprestimo[]> {
        return await this.emprestimoRepo.listarEmprestimos();
    }

    public async buscarEmprestimoPeloId(id: number) : Promise<Emprestimo> {
        const emprestimo = await this.emprestimoRepo.consultarEmprestimoPeloId(id);

        if (emprestimo === undefined) {
            throw new EmprestimoNotFoundError(id);
        }

        return emprestimo;
    }
}