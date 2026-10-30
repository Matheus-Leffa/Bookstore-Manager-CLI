import { Livro } from "../models/Livro";
import { AutorRepository } from "../repositories/AutorRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorNotFoundError } from "../exceptions/AutorNotFoundError";
import { AtualizarLivroDTO } from "../models/AtualizarLivroDTO";

export class LivroService{
    private repository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor(repository: LivroRepository, autorRepository: AutorRepository){
        this.repository = repository;
        this.autorRepository = autorRepository;
    }

    private validarDadosLivro(livro: Livro): void {
        if(livro.getNome().trim() === ""){
            throw new Error(); //ACRESCENTAR ERRO PERSONALIZADO.
        }

        if (!/^\d{13}$/.test(livro.getIsbn().trim())) {
            throw new Error(); // ACRESCENTAR ERRO PERSONALIZADO.
        }
    }

    public async cadastrarLivro(livro: Livro) : Promise<Livro> {

        this.validarDadosLivro(livro);

        const isbn = livro.getIsbn().trim();
        const nome = livro.getNome().trim().toLowerCase();

        const livroComMesmoIsbn = await this.repository.buscarPeloIsbn(isbn);

        if (livroComMesmoIsbn !== undefined) {
            throw new Error(); // depois: erro personalizado
        }
       
        const livroComMesmoNome = await this.repository.buscarPeloNome(nome);

        if( livroComMesmoNome !== undefined){
            throw new Error(); //ACRESCENTAR ERRO PERSONALIZADO;
        }

        const autorEncontrado = await this.autorRepository.buscarPeloId(livro.getAutor().getId());

        if (autorEncontrado === undefined) {
            throw new AutorNotFoundError(livro.getAutor().getId());
        }

        return await this.repository.cadastrarLivro(livro);
    }

    public async buscarLivroPeloId(id: number) : Promise<Livro | undefined> {

        const livroEncontrado = await this.repository.buscarPeloId(id);

        if(livroEncontrado === undefined){
            throw new Error(); // ACRESCENTAR ERRO PERSONALIZADO
        }

        return livroEncontrado;
    }

    public async listarLivros() : Promise<Livro[]>{
        return await this.repository.listarLivros();
    }

    public async atualizarLivro(id: number, novosDados: AtualizarLivroDTO): Promise<Livro>{

        const livroAtualizado = await this.repository.atualizarLivro(id, novosDados);

        if(livroAtualizado === undefined){
            throw new Error(); // ACRESCENTAR ERRO PERSONALIZADO
        }

        if(novosDados.nome.trim() === ""){
            throw new Error(); // ACRESCENTAR ERRO PERSONALIZADO
        }

        return livroAtualizado;
    }

    public async removerLivroPeloId(id: number) : Promise<Livro>{
        const livroDeletado = await this.repository.removerLivroPeloId(id);

        if(livroDeletado === undefined){
            throw new Error(); // ACRESCENTAR ERRO PERSONALIZADO
        }

        return livroDeletado;
    }
}  