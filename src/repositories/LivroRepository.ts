import { Livro } from "../models/Livro";
import { AtualizarLivroDTO } from "../models/AtualizarLivroDTO";

export interface LivroRepository{
    cadastrarLivro(livro: Livro): Promise<Livro>;

    listarLivros(): Promise<Livro[]>;

    buscarPeloId(id: number): Promise<Livro | undefined>;

    atualizarLivro(id: number, livroAtualizado: AtualizarLivroDTO): Promise<Livro | undefined>;

    removerLivroPeloId(id: number): Livro | undefined;
}