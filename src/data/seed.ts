import { Cliente } from "../models/Clientes";
import { Emprestimo } from "../models/Emprestimo";
import { Livro } from "../models/Livro";
import { AutorRepository } from "../repositories/AutorRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { Autor } from "../models/Autor";

export async function seed(
    autorRepository: AutorRepository,
    livroRepository: LivroRepository,
    clienteRepository: ClienteRepository,
    emprestimoRepository: EmprestimoRepository
): Promise<void> {
    if (
        (await autorRepository.listarAutores()).length > 0 ||
        (await livroRepository.listarLivros()).length > 0 ||
        (await clienteRepository.listarClientes()).length > 0 ||
        (await emprestimoRepository.listarEmprestimos()).length > 0
    ) {
        return;
    }

    const autores: Autor[] = [];
    for (const [nome, nacionalidade] of [
        ["JRR Tolkien", "Inglês"],
        ["JK Rowling", "Inglês"],
        ["GRR Martin", "Americano"],
        ["Fiódor Dostoiévski", "Russo"],
        ["George Orwell", "Inglês"]
    ] as const) {
        autores.push(await autorRepository.cadastrarAutor(new Autor(nome, nacionalidade)));
    }

    const livros: Livro[] = [];
    for (const [nome, isbn, autorId] of [
        ["O Senhor dos Anéis: A Sociedade do Anel", "9788595084759", 1],
        ["O Silmarillion", "9786560050020", 1],
        ["Contos Inacabados", "9788595085701", 1],
        ["Harry Potter e a Pedra Filosofal", "9788532530783", 2],
        ["Harry Potter e a Câmara Secreta", "9788532530554", 2],
        ["A Guerra dos Tronos", "9788556510785", 3],
        ["Noites Brancas", "9788573263350", 4],
        ["Crime e Castigo", "9788573266467", 4],
        ["Gente Pobre", "9788573264333", 4],
        ["1984", "9788535932966", 5]
    ] as const) {
        const autor = autores[autorId - 1];
        if (autor === undefined) {
            throw new Error(`Autor ${autorId} não encontrado durante o seed.`);
        }
        livros.push(await livroRepository.cadastrarLivro(new Livro(nome, isbn, autor)));
    }

    const clientes: Cliente[] = [];
    for (const [nome, cpf, telefone] of [
        ["Matheus", "12345678911", "912345678"],
        ["Milene", "12345678912", "912345679"],
        ["Joaquina", "12345678913", "9123456787"]
    ] as const) {
        clientes.push(await clienteRepository.cadastrarCliente(new Cliente(nome, cpf, telefone)));
    }

    for (const [clienteId, livroId] of [
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 4],
        [2, 5],
        [3, 6],
        [3, 7],
        [3, 8],
        [3, 10]
    ] as const) {
        const cliente = clientes[clienteId - 1];
        const livro = livros[livroId - 1];
        if (cliente === undefined || livro === undefined) {
            throw new Error(`Relacionamento inválido no seed: cliente ${clienteId}, livro ${livroId}.`);
        }

        const emprestimo = new Emprestimo(new Date("2026-10-30T00:00:00"), cliente, livro);
        await emprestimoRepository.realizarEmprestimo(emprestimo);
        await livroRepository.atualizarDisponibilidade(livroId, false);
    }
}