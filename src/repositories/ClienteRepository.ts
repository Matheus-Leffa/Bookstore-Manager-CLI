import { AtualizarClienteDTO } from "../models/AtualizarClienteDto";
import { Cliente } from "../models/Clientes";

export interface ClienteRepository{
    cadastrarLivro(cliente: Cliente): Promise<Cliente>;

    listarLivros(): Promise<Cliente[]>;

    buscarPeloId(id: number): Promise<Cliente | undefined>;

    atualizarLivro(id: number, clienteAtualizado: AtualizarClienteDTO): Promise<Cliente | undefined>;

    removerLivroPeloId(id: number): Promise<Cliente | undefined>;

    buscarPeloCpf(cpf: string): Promise<Cliente | undefined>

    buscarPeloTelefone(telefone: string): Promise<Cliente | undefined>
}