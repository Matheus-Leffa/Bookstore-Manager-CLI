import { Interface } from "node:readline/promises";
import { AutorController } from "../controllers/AutorController";
import { ClienteController } from "../controllers/ClienteController";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { LivroController } from "../controllers/LivroController";
import { exibirErro, lerNumero } from "../utils/MenuUtil";
import { MenuAutores } from "./MenuAutores";
import { MenuClientes } from "./MenuClientes";
import { MenuEmprestimos } from "./MenuEmprestimos";
import { MenuLivros } from "./MenuLivros";

export class MenuGeral {
    private readonly menuAutores: MenuAutores;
    private readonly menuLivros: MenuLivros;
    private readonly menuClientes: MenuClientes;
    private readonly menuEmprestimos: MenuEmprestimos;

    public constructor(
        autorController: AutorController,
        livroController: LivroController,
        clienteController: ClienteController,
        emprestimoController: EmprestimoController,
        private readonly entrada: Interface
    ) {
        this.menuAutores = new MenuAutores(autorController, entrada);
        this.menuLivros = new MenuLivros(livroController, autorController, entrada);
        this.menuClientes = new MenuClientes(clienteController, entrada);
        this.menuEmprestimos = new MenuEmprestimos(emprestimoController, clienteController, livroController, entrada);
    }

    public async iniciar(): Promise<void> {
        let sair = false;
        while (!sair) {
            console.log("\n=== Bookstore Manager ===");
            console.log("1. Gerenciar autores");
            console.log("2. Gerenciar livros");
            console.log("3. Gerenciar clientes");
            console.log("4. Gerenciar empréstimos");
            console.log("5. Sair da aplicação");
            const opcao = await lerNumero(this.entrada, "Escolha uma opção: ");

            try {
                switch (opcao) {
                    case 1: await this.menuAutores.iniciar(); break;
                    case 2: await this.menuLivros.iniciar(); break;
                    case 3: await this.menuClientes.iniciar(); break;
                    case 4: await this.menuEmprestimos.iniciar(); break;
                    case 5: sair = true; console.log("Até logo!"); break;
                    default: console.log("Opção inválida.");
                }
            } catch (erro) {
                exibirErro(erro);
            }
        }
    }
}
