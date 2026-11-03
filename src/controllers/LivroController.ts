import { AtualizarLivroDTO } from "../models/AtualizarLivroDTO";
import { Autor } from "../models/Autor";
import { Livro } from "../models/Livro";
import { LivroService } from "../services/LivroService";

export class LivroController{
    private service: LivroService;

    constructor(service: LivroService){
        this.service = service;
    }

    public async cadastrarLivro(nome: string, isbn: string, autor: Autor): Promise<Livro>{

        return await this.service.cadastrarLivro(nome, isbn, autor);
    }

    public async buscarLivroPeloId(id: number) : Promise<Livro> {
        return await this.service.buscarLivroPeloId(id);
    }

    public async listarLivros(): Promise<Livro[]>{
        return await this.service.listarLivros();
    }

    public async atualizarLivro(id: number, novosDados: AtualizarLivroDTO) : Promise<Livro>{
        return await this.service.atualizarLivro(id, novosDados);
    }

    public async removerLivroPeloId(id: number) : Promise<Livro> {
        return await this.service.removerLivroPeloId(id);
    }
}