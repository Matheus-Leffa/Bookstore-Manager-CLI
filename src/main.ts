import { AutorController } from "./controllers/AutorController";
import { AutorRepositoryMemoria } from "./repositories/AutorRepositoryMemoria";
import { AutorService } from "./services/AutorService";

const repository = new AutorRepositoryMemoria();
const service = new AutorService(repository);
const controller = new AutorController(service);

const nome = "JRR Tolkien";
const nacionalidade = "Inglês";

controller.cadastrarAutor(nome, nacionalidade);

console.log(controller.listarAutores());
