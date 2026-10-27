import { AutorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";
import { atualizarAutorDTO } from "../models/AtualizarAutorDto";
import { AutorNotFoundError } from "../exceptions/AutorNotFoundError";
import { AutorNameInvalid } from "../exceptions/AutorNameInvalid";


export class AutorService{
    private repository: AutorRepository;

    constructor(repository: AutorRepository){
        this.repository = repository;
    }

    private validarAutor(autor: Autor) : void{
        if(autor.getNome().trim() === ""){
            throw new AutorNameInvalid();
        }

        return ;
    }

    public cadastrarAutor(autor: Autor): Autor {

        this.validarAutor(autor);

        return this.repository.cadastrarAutor(autor);
    }

    public buscarAutorPeloId(id: number) : Autor {

        const autorEncontrado = this.repository.buscarPeloId(id);

        if(autorEncontrado === undefined){
            throw new AutorNotFoundError(id);
        }

        return autorEncontrado;
    }

    public listarAutores() : Autor[]{
        return this.repository.listarAutores();
    }

    public atualizarAutor(id: number, novosDados: atualizarAutorDTO) : Autor {

        const autorAtualizado = this.repository.atualizarAutor(id, novosDados);

        if(autorAtualizado === undefined){
            throw new AutorNotFoundError(id);
        }


        if(novosDados.nome.trim() === ""){
            throw new AutorNameInvalid();
        }

       
        return autorAtualizado;
    }

    public removerAutorPeloId(id: number) : Autor{

        const autorDeletado = this.repository.removerAutorPeloId(id);

        if(autorDeletado === undefined){
            throw new AutorNotFoundError(id);
        }
        
        return autorDeletado;
    }

}