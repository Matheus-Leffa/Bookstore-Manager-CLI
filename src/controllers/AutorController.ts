import { AtualizarAutorDTO } from "../models/AtualizarAutorDto";
import { Autor } from "../models/Autor";
import { AutorService } from "../services/AutorService";

export class AutorController{
    private service: AutorService;

    constructor(service: AutorService){
        this.service = service;
    }

    public async cadastrarAutor(nome: string, nacionalidade: string): Promise<Autor> {

        return await this.service.cadastrarAutor(nome, nacionalidade);
    }

    public async buscarAutorPeloId(id: number): Promise<Autor> {
        return await this.service.buscarAutorPeloId(id);
    }

    public async listarAutores(): Promise<Autor[]> {
        return await this.service.listarAutores();
    }

    public async atualizarAutor(id: number, novosDados: AtualizarAutorDTO) : Promise<Autor> {
        return await this.service.atualizarAutor(id, novosDados);
    }

    public async removerAutorPeloId(id: number) : Promise<Autor> {
        return await this.service.removerAutorPeloId(id);
    }
}