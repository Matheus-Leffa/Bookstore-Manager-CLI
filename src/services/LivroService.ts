import { Livro } from "../models/Livro";
import { AutorRepository } from "../repositories/AutorRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorNotFoundError } from "../exceptions/AutorNotFoundError";
import { AtualizarLivroDTO } from "../models/AtualizarLivroDTO";
import { LivroNameInvalidError } from "../exceptions/LivroNameInvalidError";
import { LivroIsbnInvalidError } from "../exceptions/LivroIsbnInvalidError";
import { LivroIsbnAlreadyExistsError } from "../exceptions/LivroIsbnAlreadyExistsError";
import { LivroNameAlreadyExistsError } from "../exceptions/LivroNameAlreadyExistsError";
import { LivroNotFoundError } from "../exceptions/LivroNotFoundError";
import { Autor } from "../models/Autor";

export class LivroService{
    private repository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor(repository: LivroRepository, autorRepository: AutorRepository){
        this.repository = repository;
        this.autorRepository = autorRepository;
    }

    private validarDadosLivro(nome: string, isbn: string): void {
        if (nome.trim() === "") {
            throw new LivroNameInvalidError();
        }

        if (!/^\d{13}$/.test(isbn.trim())) {
            throw new LivroIsbnInvalidError();
        }
    }

    private async validarIsbnENomeRepetidos(isbn: string, nome: string, idLivroAtual?: number): Promise<void> {
        const livroComMesmoIsbn = await this.repository.buscarPeloIsbn(isbn);

        if (livroComMesmoIsbn !== undefined && livroComMesmoIsbn.getId() !== idLivroAtual) {
            throw new LivroIsbnAlreadyExistsError();
        }
       
        const livroComMesmoNome = await this.repository.buscarPeloNome(nome);

        if (livroComMesmoNome !== undefined && livroComMesmoNome.getId() !== idLivroAtual) {
            throw new LivroNameAlreadyExistsError();
        }
    }
    
    public async cadastrarLivro(nome: string, isbn: string, autor: Autor) : Promise<Livro> {

        this.validarDadosLivro(nome, isbn);

        const isbnFormatado = isbn.trim();
        const nomeFormatado = nome.trim().toLowerCase();

        await this.validarIsbnENomeRepetidos(isbn, nome);

        const autorEncontrado = await this.autorRepository.buscarPeloId(autor.getId());

        if (autorEncontrado === undefined) {
            throw new AutorNotFoundError(autor.getId());
        }

        const livro = new Livro(nomeFormatado, isbnFormatado, autor)

        return await this.repository.cadastrarLivro(livro);
    }

    public async buscarLivroPeloId(id: number) : Promise<Livro> {

        const livroEncontrado = await this.repository.buscarPeloId(id);

        if(livroEncontrado === undefined){
            throw new LivroNotFoundError(id);
        }

        return livroEncontrado;
    }

    public async listarLivros() : Promise<Livro[]>{
        return await this.repository.listarLivros();
    }

    public async atualizarLivro(id: number, novosDados: AtualizarLivroDTO): Promise<Livro>{

        const livroExistente = await this.repository.buscarPeloId(id);

        if (livroExistente === undefined) {
            throw new LivroNotFoundError(id);
        }

        if (!/^\d{13}$/.test(novosDados.isbn.trim())) {
            throw new LivroIsbnInvalidError();
        }

        if (novosDados.nome.trim() === "") {
            throw new LivroNameInvalidError();
        }

        const isbn = novosDados.isbn.trim();
        const nome = novosDados.nome.trim().toLowerCase();

        await this.validarIsbnENomeRepetidos(isbn, nome, id);

        const autorEncontrado = await this.autorRepository.buscarPeloId(novosDados.autor.getId());

        if (autorEncontrado === undefined) {
            throw new AutorNotFoundError(novosDados.autor.getId());
        }

        const livroAtualizado = await this.repository.atualizarLivro(id, {
            nome,
            isbn,
            autor: autorEncontrado
        });

        if(livroAtualizado === undefined){
            throw new LivroNotFoundError(id);
        }

        return livroAtualizado;
    }

    public async removerLivroPeloId(id: number) : Promise<Livro>{
        const livroDeletado = await this.repository.removerLivroPeloId(id);

        if(livroDeletado === undefined){
            throw new LivroNotFoundError(id);
        }

        return livroDeletado;
    }
}  