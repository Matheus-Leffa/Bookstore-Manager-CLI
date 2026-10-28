import { Autor } from "../models/Autor";
import { AtualizarAutorDTO } from "../models/AtualizarAutorDto";
import { AutorRepository } from "./AutorRepository";

export class AutorRepositoryMemoria implements AutorRepository{

    private autores: Autor[] = [];

    async cadastrarAutor(autor: Autor): Promise<Autor> {
        this.autores.push(autor);
    
        return autor;
    }

    async listarAutores(): Promise<Autor[]> {
        return this.autores;
    }

    async buscarPeloId(id: number): Promise<Autor | undefined> {
        return this.autores.find(autor => autor.getId() === id);
    }

    async atualizarAutor(id: number, autorAtualizado: AtualizarAutorDTO): Promise<Autor | undefined> {
        const autor = await this.buscarPeloId(id);

        if(autor === undefined){
            return undefined;
        }

        autor.setNome(autorAtualizado.nome);
        autor.setNacionalidade(autorAtualizado.nacionalidade);
        
        return autor;
    }

    async removerAutorPeloId(id: number): Promise <Autor | undefined> {
        const index = this.autores.findIndex(autor => autor.getId() === id);

        if(index === -1){
            return undefined;
        }

        const autorRemovido = this.autores.splice(index, 1);

        return autorRemovido[0];
    }
    
}