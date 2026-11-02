import { AtualizarClienteDTO } from "../models/AtualizarClienteDTO";
import { Cliente } from "../models/Clientes";
import { ClienteService } from "../services/ClienteService";

export class ClienteController{
    private service:ClienteService;

    constructor(service: ClienteService){
        this.service = service;
    }

    public async cadastrarCliente(nome: string, cpf: string, telefone: string): Promise<Cliente>{

        return await this.service.cadastrarCliente(nome, cpf, telefone);
    }

    public async buscarclientePeloId(id: number) : Promise<Cliente> {
        return await this.service.buscarClientePeloId(id);
    }

    public async listarclientes(): Promise<Cliente[]>{
        return await this.service.listarClientes();
    }

    public async atualizarcliente(id: number, novosDados: AtualizarClienteDTO) : Promise<Cliente>{
        return await this.service.atualizarCliente(id, novosDados);
    }

    public async removerclientePeloId(id: number) : Promise<Cliente> {
        return await this.service.removerClientePeloId(id);
    }
}