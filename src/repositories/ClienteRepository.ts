import { AtualizarClienteDTO } from "../models/AtualizarClienteDto";
import { Cliente } from "../models/Clientes";

export interface ClienteRepository{

    cadastrarCliente(cliente: Cliente): Promise<Cliente>;

    listarClientes(): Promise<Cliente[]>;

    buscarPeloId(id: number): Promise<Cliente | undefined>;

    atualizarCliente(id: number, clienteAtualizado: AtualizarClienteDTO): Promise<Cliente | undefined>;

    removerClientePeloId(id: number): Promise<Cliente | undefined>;

    buscarPeloCpf(cpf: string): Promise<Cliente | undefined>

    buscarPeloTelefone(telefone: string): Promise<Cliente | undefined>
}