import { AutorController } from "./controllers/AutorController";
import { LivroController } from "./controllers/LivroController";
import { AutorRepositoryMemoria } from "./repositories/AutorRepositoryMemoria";
import { LivroRepositoryMemoria } from "./repositories/LivroRepositoryMemoria";
import { AutorService } from "./services/AutorService";
import { LivroService } from "./services/LivroService";

const autorRepo = new AutorRepositoryMemoria();
const autorServ = new AutorService(autorRepo);
const autorControll = new AutorController(autorServ);

const livroRepo = new LivroRepositoryMemoria();
const livroServ = new LivroService(livroRepo, autorRepo);
const livroControll = new LivroController(livroServ);

const nome = "JRR Tolkien";
const nacionalidade = "Inglês";

async function main() {
	const autor = await autorControll.cadastrarAutor(nome, nacionalidade);

	console.log(await autorControll.listarAutores());

	const nomeLivro = "LOTR";
	const isbn = "1234567891234";

	await livroControll.cadastrarLivro(nomeLivro, isbn, autor);

    console.log(await livroControll.listarLivros());
}

main();


