import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { AutorController } from "./controllers/AutorController";
import { ClienteController } from "./controllers/ClienteController";
import { EmprestimoController } from "./controllers/EmprestimoController";
import { LivroController } from "./controllers/LivroController";
import { MenuGeral } from "./menus/MenuGeral";
import { AutorRepositoryMemoria } from "./repositories/AutorRepositoryMemoria";
import { ClienteRepositoryMemoria } from "./repositories/ClienteRepositoryMemoria";
import { EmprestimoRepositoryMemoria } from "./repositories/EmprestimoRepositoryMemoria";
import { LivroRepositoryMemoria } from "./repositories/LivroRepositoryMemoria";
import { AutorService } from "./services/AutorService";
import { ClienteService } from "./services/ClienteService";
import { EmprestimoService } from "./services/EmprestimoService";
import { LivroService } from "./services/LivroService";
import { seed } from "./data/seed";

async function main(): Promise<void> {
    const autorRepository = new AutorRepositoryMemoria();
    const livroRepository = new LivroRepositoryMemoria();
    const clienteRepository = new ClienteRepositoryMemoria();
    const emprestimoRepository = new EmprestimoRepositoryMemoria();

    const autorController = new AutorController(new AutorService(autorRepository));
    const livroController = new LivroController(new LivroService(livroRepository, autorRepository));
    const clienteController = new ClienteController(new ClienteService(clienteRepository));
    const emprestimoController = new EmprestimoController(
        new EmprestimoService(emprestimoRepository, livroRepository, clienteRepository)
    );
    await seed(
        autorRepository,
        livroRepository,
        clienteRepository,
        emprestimoRepository
    );
    const entrada = createInterface({ input, output });

    try {
        await new MenuGeral(
            autorController,
            livroController,
            clienteController,
            emprestimoController,
            entrada
        ).iniciar();
    } finally {
        entrada.close();
    }
}

main().catch((erro: unknown) => {
    console.error("Erro inesperado na aplicação:", erro);
});
