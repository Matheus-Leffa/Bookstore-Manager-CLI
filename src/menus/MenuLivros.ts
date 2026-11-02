import { Interface } from "node:readline/promises";
import { AutorController } from "../controllers/AutorController";
import { LivroController } from "../controllers/LivroController";
import { Autor } from "../models/Autor";
import { exibirErro, formatarData, lerNumero } from "../utils/MenuUtil";

export class MenuLivros {
    public constructor(
        private readonly controller: LivroController,
        private readonly autorController: AutorController,
        private readonly entrada: Interface
    ) {}

    public async iniciar(): Promise<void> {
        let voltar = false;
        while (!voltar) {
            console.log("\n=== Gerenciar livros ===");
            console.log("1. Cadastrar livro");
            console.log("2. Buscar livro pelo ID");
            console.log("3. Listar livros");
            console.log("4. Atualizar livro");
            console.log("5. Remover livro pelo ID");
            console.log("6. Voltar ao menu principal");
            const opcao = await lerNumero(this.entrada, "Escolha uma opção: ");
            try {
                switch (opcao) {
                    case 1: await this.cadastrar(); break;
                    case 2: await this.buscar(); break;
                    case 3: await this.listar(); break;
                    case 4: await this.atualizar(); break;
                    case 5: await this.remover(); break;
                    case 6: voltar = true; break;
                    default: console.log("Opção inválida.");
                }
            } catch (erro) {
                exibirErro(erro);
            }
        }
    }

    private async selecionarAutor(): Promise<Autor | undefined> {
        const id = await lerNumero(this.entrada, "ID do autor: ");
        return id === undefined ? undefined : await this.autorController.buscarAutorPeloId(id);
    }

    private async cadastrar(): Promise<void> {
        const nome = await this.entrada.question("Nome: ");
        const isbn = await this.entrada.question("ISBN (13 dígitos): ");
        const autor = await this.selecionarAutor();
        if (autor === undefined) return;
        const livro = await this.controller.cadastrarLivro(nome, isbn, autor);
        console.log(`Livro cadastrado com ID ${livro.getId()}.`);
    }

    private async buscar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do livro: ");
        if (id === undefined) return;
        const livro = await this.controller.buscarLivroPeloId(id);
        console.log(`${livro.getId()} - ${livro.getNome()} | ISBN: ${livro.getIsbn()} | Autor: ${livro.getAutor().getNome()} | ${livro.isDisponivel() ? "disponível" : "emprestado"}`);
    }

    private async listar(): Promise<void> {
        const livros = await this.controller.listarLivros();
        if (livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
            return;
        }
        livros.forEach((livro) => console.log(`${livro.getId()} - ${livro.getNome()} | ISBN: ${livro.getIsbn()} | Autor: ${livro.getAutor().getNome()} | ${livro.isDisponivel() ? "disponível" : "emprestado"} | Criado em: ${formatarData(livro.getCriadoEm())}`));
    }

    private async atualizar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do livro: ");
        if (id === undefined) return;
        const nome = await this.entrada.question("Novo nome: ");
        const isbn = await this.entrada.question("Novo ISBN (13 dígitos): ");
        const autor = await this.selecionarAutor();
        if (autor === undefined) return;
        const livro = await this.controller.atualizarLivro(id, { nome, isbn, autor });
        console.log(`Livro ${livro.getId()} atualizado.`);
    }

    private async remover(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do livro: ");
        if (id === undefined) return;
        const livro = await this.controller.removerLivroPeloId(id);
        console.log(`Livro ${livro.getId()} removido.`);
    }
}
