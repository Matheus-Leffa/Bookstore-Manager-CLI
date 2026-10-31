import { AtualizarClienteDTO } from "../models/AtualizarClienteDto";
import { Cliente } from "../models/Clientes";
import { ClienteRepository } from "./ClienteRepository";

export class ClienteRepositoryMemoria implements ClienteRepository{

    private clientes: Cliente[] = [];

    async cadastrarLivro(cliente: Cliente): Promise<Cliente> {
        this.clientes.push(cliente);

        return cliente;
    }

    async listarLivros(): Promise<Cliente[]> {
        return this.clientes;
    }

    async buscarPeloId(id: number): Promise<Cliente | undefined> {
        return this.clientes.find(cliente => cliente.getId() === id);
    }

    async atualizarLivro(id: number, clienteAtualizado: AtualizarClienteDTO): Promise<Cliente | undefined> {
        const cliente = await this.buscarPeloId(id);

        if(cliente === undefined){
            return undefined;
        }

        cliente.setNome(clienteAtualizado.nome);
        cliente.setCpf(clienteAtualizado.cpf);
        cliente.setTelefone(clienteAtualizado.telefone);
        
        return cliente;
    }

    async removerLivroPeloId(id: number): Promise<Cliente | undefined> {
        const index = this.clientes.findIndex(cliente => cliente.getId() === id);

        if(index === -1){
            return undefined;
        }

        const clienteRemovido = this.clientes.splice(index, 1);

        return clienteRemovido[0];
    }

    async buscarPeloCpf(cpf: string): Promise<Cliente | undefined> {
         return this.clientes.find(cliente => cliente.getCpf().trim() === cpf.trim());
    }

    async buscarPeloTelefone(telefone: string): Promise<Cliente | undefined> {
        return this.clientes.find(cliente => cliente.getTelefone().trim() === telefone.trim());
    }
    
}