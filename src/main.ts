import { AutorController } from "./controllers/AutorController";
import { ClienteController } from "./controllers/ClienteController";
import { LivroController } from "./controllers/LivroController";
import { AutorRepositoryMemoria } from "./repositories/AutorRepositoryMemoria";
import { ClienteRepositoryMemoria } from "./repositories/ClienteRepositoryMemoria";
import { EmprestimoRepositoryMemoria } from "./repositories/EmprestimoRepositoryMemoria";
import { LivroRepositoryMemoria } from "./repositories/LivroRepositoryMemoria";
import { AutorService } from "./services/AutorService";
import { ClienteService } from "./services/ClienteService";
import { EmprestimoService } from "./services/EmprestimoService";
import { LivroService } from "./services/LivroService";
import { Autor } from "./models/Autor";
import { Cliente } from "./models/Clientes";
import { Emprestimo } from "./models/Emprestimo";
import { Livro } from "./models/Livro";

function verificar(condicao: boolean, mensagem: string): void {
    if (!condicao) {
        throw new Error(`Teste falhou: ${mensagem}`);
    }
}

async function main(): Promise<void> {
    const autorRepository = new AutorRepositoryMemoria();
    const livroRepository = new LivroRepositoryMemoria();
    const clienteRepository = new ClienteRepositoryMemoria();
    const emprestimoRepository = new EmprestimoRepositoryMemoria();

    const autorController = new AutorController(new AutorService(autorRepository));
    const livroController = new LivroController(
        new LivroService(livroRepository, autorRepository)
    );
    const clienteController = new ClienteController(new ClienteService(clienteRepository));
    const emprestimoService = new EmprestimoService(
        emprestimoRepository,
        livroRepository,
        clienteRepository
    );

    const autores: Autor[] = await Promise.all([
        autorController.cadastrarAutor("J. R. R. Tolkien", "Inglês"),
        autorController.cadastrarAutor("Machado de Assis", "Brasileiro"),
        autorController.cadastrarAutor("Jane Austen", "Inglesa")
    ]);

    const livros: Livro[] = [];
    for (let indiceAutor = 0; indiceAutor < autores.length; indiceAutor++) {
        const autor = autores[indiceAutor];
        if (autor === undefined) {
            throw new Error(`Autor ${indiceAutor} não foi criado.`);
        }

        livros.push(
            await livroController.cadastrarLivro(
                `Livro ${indiceAutor + 1}A`,
                `97800000000${indiceAutor}1`,
                autor
            )
        );
        livros.push(
            await livroController.cadastrarLivro(
                `Livro ${indiceAutor + 1}B`,
                `97800000000${indiceAutor}2`,
                autor
            )
        );
    }

    const clientes: Cliente[] = await Promise.all([
        clienteController.cadastrarCliente("Cliente 1", "11111111111", "21111111111"),
        clienteController.cadastrarCliente("Cliente 2", "22222222222", "22222222222"),
        clienteController.cadastrarCliente("Cliente 3", "33333333333", "23333333333")
    ]);

    const emprestimos: Emprestimo[] = await Promise.all(
        clientes.map((cliente, indice) =>
            emprestimoService.realizarEmprestimo(cliente.getId(), livros[indice * 2]!.getId())
        )
    );

    verificar((await autorController.listarAutores()).length === 3, "listar autores");
    verificar(
        (await autorController.buscarAutorPeloId(autores[0]!.getId())).getId() === autores[0]!.getId(),
        "buscar autor pelo ID"
    );

    const autorAtualizado = await autorController.atualizarAutor(autores[0]!.getId(), {
        nome: "J. R. R. Tolkien Atualizado",
        nacionalidade: "Inglês"
    });
    verificar(autorAtualizado.getNome() === "J. R. R. Tolkien Atualizado", "atualizar autor");

    verificar((await livroController.listarLivros()).length === 6, "listar livros");
    verificar(
        (await livroController.buscarLivroPeloId(livros[0]!.getId())).getId() === livros[0]!.getId(),
        "buscar livro pelo ID"
    );

    const livroAtualizado = await livroController.atualizarLivro(livros[1]!.getId(), {
        nome: "Livro 1B Atualizado",
        isbn: "9780000000099",
        autor: autores[0]!
    });
    verificar(livroAtualizado.getNome() === "livro 1b atualizado", "atualizar livro");

    verificar((await clienteController.listarclientes()).length === 3, "listar clientes");
    verificar(
        (await clienteController.buscarclientePeloId(clientes[0]!.getId())).getId() === clientes[0]!.getId(),
        "buscar cliente pelo ID"
    );

    const clienteAtualizado = await clienteController.atualizarcliente(clientes[0]!.getId(), {
        nome: "Cliente 1 Atualizado",
        cpf: "11111111112",
        telefone: "21111111112"
    });
    verificar(clienteAtualizado.getNome() === "cliente 1 atualizado", "atualizar cliente");

    verificar((await emprestimoService.listarEmprestimos()).length === 3, "listar empréstimos");
    emprestimos.forEach((emprestimo, indice) => {
        verificar(emprestimo.getLivro().getId() === livros[indice * 2]!.getId(), "livro do empréstimo");
        verificar(emprestimo.getCliente().getId() === clientes[indice]!.getId(), "cliente do empréstimo");
        verificar(emprestimo.getDataEmprestimo() instanceof Date, "data do empréstimo");
        verificar(!emprestimo.getLivro().isDisponivel(), "livro emprestado indisponível");
    });

    await emprestimoService.realizarDevolucao(emprestimos[0]!.getId());
    verificar(livros[0]!.isDisponivel(), "livro disponível após devolução");
    verificar(!emprestimos[0]!.estaAtivo(), "empréstimo encerrado após devolução");

    console.log("Suíte de testes executada com sucesso.");
    console.log(`Autores: ${autores.length}`);
    console.log(`Livros: ${livros.length}`);
    console.log(`Clientes: ${clientes.length}`);
    console.log(`Empréstimos: ${(await emprestimoService.listarEmprestimos()).length}`);
}

main().catch((erro: unknown) => {
    console.error("A suíte de testes falhou:", erro);
});
