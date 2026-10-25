import { Autor } from "../models/Autor";

export interface AutorRepository{
    cadastrarAutor(autor: Autor): Autor;

    listarAutores(): Autor[];

    buscarPeloId(id: number): Autor | undefined;

    atualizarAutor(id: number, autorAtualizado: Autor): Autor | undefined;

    removerAutorPeloId(id: number): Autor | undefined;
}