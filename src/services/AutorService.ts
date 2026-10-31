import { AutorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";
import { AtualizarAutorDTO } from "../models/AtualizarAutorDto";
import { AutorNotFoundError } from "../exceptions/AutorNotFoundError";
import { AutorNameInvalidError } from "../exceptions/AutorNameInvalidError";


export class AutorService{
    private repository: AutorRepository;

    constructor(repository: AutorRepository){
        this.repository = repository;
    }

    //classe interna para não ficar repetindo código. Por isso não usei async.
    private validarAutor(autor: Autor) : void{ 
        if(autor.getNome().trim() === ""){
            throw new AutorNameInvalidError();
        }

        return ;
    }

    public async cadastrarAutor(autor: Autor): Promise<Autor> {

        this.validarAutor(autor);

        return await this.repository.cadastrarAutor(autor);
    }

    public async buscarAutorPeloId(id: number) : Promise<Autor> {

        const autorEncontrado = await this.repository.buscarPeloId(id);

        if(autorEncontrado === undefined){
            throw new AutorNotFoundError(id);
        }

        return autorEncontrado;
    }

    public async listarAutores() : Promise<Autor[]> {
        return await this.repository.listarAutores();
    }

    public async atualizarAutor(id: number, novosDados: AtualizarAutorDTO) : Promise<Autor> {

        const autorAtualizado = await this.repository.atualizarAutor(id, novosDados);

        if(autorAtualizado === undefined){
            throw new AutorNotFoundError(id);
        }


        if(novosDados.nome.trim() === ""){
            throw new AutorNameInvalidError();
        }
       
        return autorAtualizado;
    }

    public async removerAutorPeloId(id: number) : Promise<Autor> {

        const autorDeletado = await this.repository.removerAutorPeloId(id);

        if(autorDeletado === undefined){
            throw new AutorNotFoundError(id);
        }
        
        return autorDeletado;
    }
}