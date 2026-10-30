import { AtualizarLivroDTO } from "../models/AtualizarLivroDTO";
import { Livro } from "../models/Livro";
import { LivroRepository } from "./LivroRepository";

export class LivroRepositoryMemoria implements LivroRepository{

    private livros: Livro[] = [];

    async cadastrarLivro(livro: Livro): Promise<Livro> {
        this.livros.push(livro);

        return livro;
    }

    async listarLivros(): Promise<Livro[]> {
       return this.livros;
    }

    async buscarPeloId(id: number): Promise<Livro | undefined> {
        return this.livros.find(livro => livro.getId() === id);
    }

    async atualizarLivro(id: number, livroAtualizado: AtualizarLivroDTO): Promise<Livro | undefined> {
        const livro = await this.buscarPeloId(id);

        if(livro === undefined){
            return undefined;
        }

        livro.setNome(livroAtualizado.nome);
        livro.setIsbn(livroAtualizado.isbn);
        livro.setAutor(livroAtualizado.autor);
        
        return livro;
    }

    async removerLivroPeloId(id: number): Promise<Livro | undefined> {
        const index = this.livros.findIndex(livro => livro.getId() === id);

        if(index === -1){
            return undefined;
        }

        const livroRemovido = this.livros.splice(index, 1);

        return livroRemovido[0];
    }

   
    async buscarPeloIsbn(isbn: string): Promise<Livro | undefined>{
        return this.livros.find(livro => livro.getIsbn() === isbn);
    }

    async buscarPeloNome(nome: string): Promise<Livro | undefined>{
        return this.livros.find(livro => livro.getNome() === nome);
    }
}