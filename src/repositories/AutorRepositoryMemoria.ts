import { Autor } from "../models/Autor";
import { AutorRepository } from "./AutorRepository";

export class AutorRepositoryMemoria implements AutorRepository{

    private autores: Autor[] = [];

    cadastrarAutor(autor: Autor): Autor {
        this.autores.push(autor);
    
        return autor;
    }
    listarAutores(): Autor[] {
        return this.autores;
    }

    buscarPeloId(id: number): Autor | undefined{
        return this.autores.find(autor => autor.getId() === id);
    }

    atualizarAutor(id: number, autorAtualizado: Autor): Autor | undefined {
        const index = this.autores.findIndex(autor => autor.getId() === id);

        if(index === -1){
            return undefined;
        }

        this.autores[index] = autorAtualizado;
        
        return autorAtualizado;
    }

    removerAutorPeloId(id: number): Autor | undefined {
        const index = this.autores.findIndex(autor => autor.getId() === id);

        if(index === -1){
            return undefined;
        }

        const autorRemovido = this.autores.splice(index, 1);

        return autorRemovido[0];
    }
    
}