import { Autor } from "../models/Autor";
import { AtualizarAutorDTO } from "../models/AtualizarAutorDto";

export interface AutorRepository{
    cadastrarAutor(autor: Autor): Promise<Autor>;

    listarAutores(): Promise<Autor[]>;

    buscarPeloId(id: number): Promise<Autor | undefined>;

    atualizarAutor(id: number, autorAtualizado: AtualizarAutorDTO): Promise<Autor | undefined>;

    removerAutorPeloId(id: number): Promise<Autor | undefined>;
}