import { AutorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";
import { atualizarAutorDTO } from "../models/AtualizarAutorDto";


export class AutorService{
    private repository: AutorRepository;

    constructor(repository: AutorRepository){
        this.repository = repository;
    }

    public validarAutor(autor: Autor) : Autor{
        if(autor.getNome().trim() === ""){
            throw new Error("Nome do autor é obrigatório");
        }

        return autor;
    }

    public cadastrarAutor(autor: Autor): Autor {

        this.validarAutor(autor);

        return this.repository.cadastrarAutor(autor);
    }

    public buscarAutorPeloId(id: number) : Autor {

        const autorEncontrado = this.repository.buscarPeloId(id);

        if(autorEncontrado === undefined){
            throw new Error("Id não encontrado.");
        }

        return autorEncontrado;
    }

    public listarAutores() : Autor[]{
        return this.repository.listarAutores();
    }

    public atualizarAutor(id: number, novosDados: atualizarAutorDTO) : Autor {

        if(novosDados.nome.trim() === ""){
            throw new Error("Nome do autor é obrigatório");
        }

        const autorAtualizado = this.repository.atualizarAutor(id, novosDados);

        if(autorAtualizado === undefined){
            throw new Error("Id não encontrado.");
        }

        return autorAtualizado;
    }

    public removerAutorPeloId(id: number) : Autor{

        const autorDeletado = this.repository.removerAutorPeloId(id);

        if(autorDeletado === undefined){
            throw new Error("Id não encontrado.");
        }
        
        return autorDeletado;
    }

}