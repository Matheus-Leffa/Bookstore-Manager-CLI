import { Interface } from "node:readline/promises";
import { ClienteController } from "../controllers/ClienteController";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { LivroController } from "../controllers/LivroController";
import { exibirErro, formatarData, lerNumero } from "../utils/MenuUtil";

export class MenuEmprestimos {
    public constructor(
        private readonly controller: EmprestimoController,
        private readonly clienteController: ClienteController,
        private readonly livroController: LivroController,
        private readonly entrada: Interface
    ) {}

    public async iniciar(): Promise<void> {
        let voltar = false;
        while (!voltar) {
            console.log("\n=== Gerenciar empréstimos ===");
            console.log("1. Realizar empréstimo");
            console.log("2. Buscar empréstimo pelo ID");
            console.log("3. Listar empréstimos");
            console.log("4. Registrar devolução");
            console.log("5. Voltar ao menu principal");
            const opcao = await lerNumero(this.entrada, "Escolha uma opção: ");
            try {
                switch (opcao) {
                    case 1: await this.realizar(); break;
                    case 2: await this.buscar(); break;
                    case 3: await this.listar(); break;
                    case 4: await this.devolver(); break;
                    case 5: voltar = true; break;
                    default: console.log("Opção inválida.");
                }
            } catch (erro) {
                exibirErro(erro);
            }
        }
    }

    private async realizar(): Promise<void> {
        const clienteId = await lerNumero(this.entrada, "ID do cliente: ");
        const livroId = await lerNumero(this.entrada, "ID do livro: ");
        if (clienteId === undefined || livroId === undefined) return;
        const cliente = await this.clienteController.buscarclientePeloId(clienteId);
        const livro = await this.livroController.buscarLivroPeloId(livroId);
        const emprestimo = await this.controller.realizarEmprestimo(cliente.getId(), livro.getId());
        console.log(`Empréstimo realizado com ID ${emprestimo.getId()}.`);
    }

    private async buscar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do empréstimo: ");
        if (id === undefined) return;
        const emprestimo = await this.controller.buscarEmprestimoPeloId(id);
        console.log(`${emprestimo.getId()} - Cliente: ${emprestimo.getCliente().getNome()} | Livro: ${emprestimo.getLivro().getNome()} | Criado em: ${formatarData(emprestimo.getDataEmprestimo())} | Devolvido em: ${formatarData(emprestimo.getDataDevolucaoReal())} | ${emprestimo.estaAtivo() ? "ativo" : "devolvido"}`);
    }

    private async listar(): Promise<void> {
        const emprestimos = await this.controller.listarEmprestimos();
        if (emprestimos.length === 0) {
            console.log("Nenhum empréstimo cadastrado.");
            return;
        }
        emprestimos.forEach((emprestimo) => console.log(`${emprestimo.getId()} - Cliente: ${emprestimo.getCliente().getNome()} | Livro: ${emprestimo.getLivro().getNome()} | Criado em: ${formatarData(emprestimo.getDataEmprestimo())} | Devolvido em: ${formatarData(emprestimo.getDataDevolucaoReal())} | ${emprestimo.estaAtivo() ? "ativo" : "devolvido"}`));
    }

    private async devolver(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do empréstimo: ");
        if (id === undefined) return;
        await this.controller.realizarDevolucao(id);
        console.log("Devolução registrada.");
    }
}
