import { Autor } from "./models/Autor";
import { AutorRepositoryMemoria } from "./repositories/AutorRepositoryMemoria";

const autor1 = new Autor("JRR Tolkien", "Inglês");

const autor2 = new Autor("JK Rowling", "Inglês");

const autor3 = new Autor("GRR Martin", "Americano");

const autorNovoNaPosicao1 = { nome: "Dosto", nacionalidade: "Russo" };

const repository = new AutorRepositoryMemoria;

repository.cadastrarAutor(autor1);
repository.cadastrarAutor(autor2);
repository.cadastrarAutor(autor3);

repository.atualizarAutor(1, autorNovoNaPosicao1);
repository.removerAutorPeloId(2);
