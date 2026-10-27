import { Autor } from "../models/Autor";
import { AtualizarAutorDTO } from "../models/AtualizarAutorDto";
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

    atualizarAutor(id: number, autorAtualizado: AtualizarAutorDTO): Autor | undefined {
        const autor = this.buscarPeloId(id);

        if(autor === undefined){
            return undefined;
        }

        autor.setNome(autorAtualizado.nome);
        autor.setNacionalidade(autorAtualizado.nacionalidade);
        
        return autor;
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