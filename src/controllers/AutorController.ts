import { AtualizarAutorDTO } from "../models/AtualizarAutorDto";
import { Autor } from "../models/Autor";
import { AutorService } from "../services/AutorService";

export class AutorController{
    private service: AutorService;

    constructor(service: AutorService){
        this.service = service;
    }

    public cadastrarAutor(nome: string, nacionalidade: string): Autor{
        const autor = new Autor(nome, nacionalidade);

        return this.service.cadastrarAutor(autor);
    }

    public buscarAutorPeloId(id: number): Autor{
        return this.service.buscarAutorPeloId(id);
    }

    public listarAutores(): Autor[]{
        return this.service.listarAutores();
    }

    public atualizarAutor(id: number, novosDados: AtualizarAutorDTO) : Autor{
        return this.service.atualizarAutor(id, novosDados);
    }

    public removerAutorPeloId(id: number) : Autor {
        return this.service.removerAutorPeloId(id);
    }
}