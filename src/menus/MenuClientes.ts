import { Interface } from "node:readline/promises";
import { ClienteController } from "../controllers/ClienteController";
import { exibirErro, lerNumero } from "../utils/MenuUtil";

export class MenuClientes {
    public constructor(
        private readonly controller: ClienteController,
        private readonly entrada: Interface
    ) {}

    public async iniciar(): Promise<void> {
        let voltar = false;
        while (!voltar) {
            console.log("\n=== Gerenciar clientes ===");
            console.log("1. Cadastrar cliente");
            console.log("2. Buscar cliente pelo ID");
            console.log("3. Listar clientes");
            console.log("4. Atualizar cliente");
            console.log("5. Remover cliente pelo ID");
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
        const cpf = await this.entrada.question("CPF: ");
        const telefone = await this.entrada.question("Telefone: ");
        const cliente = await this.controller.cadastrarCliente(nome, cpf, telefone);
        console.log(`Cliente cadastrado com ID ${cliente.getId()}.`);
    }

    private async buscar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do cliente: ");
        if (id === undefined) return;
        const cliente = await this.controller.buscarclientePeloId(id);
        console.log(`${cliente.getId()} - ${cliente.getNome()} | CPF: ${cliente.getCpf()} | Telefone: ${cliente.getTelefone()}`);
    }

    private async listar(): Promise<void> {
        const clientes = await this.controller.listarclientes();
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return;
        }
        clientes.forEach((cliente) => console.log(`${cliente.getId()} - ${cliente.getNome()} | CPF: ${cliente.getCpf()} | Telefone: ${cliente.getTelefone()}`));
    }

    private async atualizar(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do cliente: ");
        if (id === undefined) return;
        const nome = await this.entrada.question("Novo nome: ");
        const cpf = await this.entrada.question("Novo CPF: ");
        const telefone = await this.entrada.question("Novo telefone: ");
        const cliente = await this.controller.atualizarcliente(id, { nome, cpf, telefone });
        console.log(`Cliente ${cliente.getId()} atualizado.`);
    }

    private async remover(): Promise<void> {
        const id = await lerNumero(this.entrada, "ID do cliente: ");
        if (id === undefined) return;
        const cliente = await this.controller.removerclientePeloId(id);
        console.log(`Cliente ${cliente.getId()} removido.`);
    }
}
