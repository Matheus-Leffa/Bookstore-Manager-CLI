import { Interface } from "node:readline/promises";
import { AutorController } from "../controllers/AutorController";
import { exibirErro, lerNumero } from "../utils/MenuUtil";

export class MenuAutores {
    public constructor(
        private readonly controller: AutorController,
        private readonly entrada: Interface
    ) {}

    public async iniciar(): Promise<void> {
        let voltar = false;
        while (!voltar) {
            console.log("\n=== Gerenciar autores ===");
            console.log("1. Cadastrar autor");
            console.log("2. Buscar autor pelo ID");
            console.log("3. Listar autores");
            console.log("4. Atualizar autor");
            console.log("5. Remover autor pelo ID");
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

    private async cadastrar(): Promise<void> {
        const nome = await this.entrada.question("Nome: ");
        const nacionalidade = await this.entrada.question("Nacionalidade: ");
        const autor = await this.controller.cadastrarAutor(nome, nacionalidade);
        console.log(`Autor cadastrado com ID ${autor.getId()}.`);
    }

    private async buscar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do autor: ");
        if (id === undefined) return;
        const autor = await this.controller.buscarAutorPeloId(id);
        console.log(`${autor.getId()} - ${autor.getNome()} (${autor.getNacionalidade()})`);
    }

    private async listar(): Promise<void> {
        const autores = await this.controller.listarAutores();
        if (autores.length === 0) {
            console.log("Nenhum autor cadastrado.");
            return;
        }
        autores.forEach((autor) => console.log(`${autor.getId()} - ${autor.getNome()} (${autor.getNacionalidade()})`));
    }

    private async atualizar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do autor: ");
        if (id === undefined) return;
        const nome = await this.entrada.question("Novo nome: ");
        const nacionalidade = await this.entrada.question("Nova nacionalidade: ");
        const autor = await this.controller.atualizarAutor(id, { nome, nacionalidade });
        console.log(`Autor ${autor.getId()} atualizado.`);
    }

    private async remover(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do autor: ");
        if (id === undefined) return;
        const autor = await this.controller.removerAutorPeloId(id);
        console.log(`Autor ${autor.getId()} removido.`);
    }
}