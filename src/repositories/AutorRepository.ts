import { Autor } from "../models/Autor";
import { atualizarAutorDTO } from "../models/AtualizarAutorDto";

export interface AutorRepository{
    cadastrarAutor(autor: Autor): Autor;

    listarAutores(): Autor[];

    buscarPeloId(id: number): Autor | undefined;

    atualizarAutor(id: number, autorAtualizado: atualizarAutorDTO): Autor | undefined;

    removerAutorPeloId(id: number): Autor | undefined;
}