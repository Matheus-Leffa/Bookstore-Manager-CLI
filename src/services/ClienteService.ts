import { ClienteCpfAlreadyExistsError } from "../exceptions/ClienteCpfAlreadyExistsError";
import { ClienteCpfInvalidError } from "../exceptions/ClienteCpfInvalidError";
import { ClienteNameInvalidError } from "../exceptions/ClienteNameInvalidError";
import { ClienteNotFoundError } from "../exceptions/ClienteNotFoundError";
import { ClienteTelefoneInvalidError } from "../exceptions/ClienteTelefoneIsInvalid";
import { AtualizarClienteDTO } from "../models/AtualizarClienteDto";
import { Cliente } from "../models/Clientes";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService{
    private repository: ClienteRepository;

    constructor(repository: ClienteRepository){
        this.repository = repository;
    }

    private validarDadosCliente(cliente: Cliente): void {
        if(cliente.getNome().trim() === ""){
            throw new ClienteNameInvalidError();
        }

        if (!/^\d{11}$/.test(cliente.getCpf().trim())) {
            throw new ClienteCpfInvalidError();
        }

        if (!/^\d{11}$/.test(cliente.getTelefone().trim())) {
            throw new ClienteTelefoneInvalidError();
        }
    }

    private async validarCpfETelefoneRepetidos(cpf: string, telefone: string, idClienteAtual?: number): Promise<void> {
            const clienteComMesmoCpf = await this.repository.buscarPeloCpf(cpf);
    
            if (clienteComMesmoCpf !== undefined && clienteComMesmoCpf.getId() !== idClienteAtual) {
                throw new ClienteCpfAlreadyExistsError();
            }
           
            const clienteComMesmoTelefone = await this.repository.buscarPeloTelefone(telefone);
    
            if (clienteComMesmoTelefone !== undefined && clienteComMesmoTelefone.getId() !== idClienteAtual) {
                throw new ClienteTelefoneInvalidError();
            }
    }

    public async cadastrarCliente(cliente: Cliente) : Promise<Cliente> {
    
        this.validarDadosCliente(cliente);
    
        const nome = cliente.getNome().trim().toLowerCase();
        const cpf = cliente.getCpf().trim();
        const telefone = cliente.getTelefone();
    
        await this.validarCpfETelefoneRepetidos(cpf, telefone);
    
        cliente.setNome(nome);
        cliente.setCpf(cpf);
        cliente.setTelefone(telefone);
    
        return await this.repository.cadastrarCliente(cliente);
    }

    public async listarClientes() : Promise<Cliente[]>{
        return await this.repository.listarClientes();
    }

    public async atualizarCliente(id: number, novosDados: AtualizarClienteDTO): Promise<Cliente>{
    
            const clienteExistente = await this.repository.buscarPeloId(id);
    
            if (clienteExistente === undefined) {
                throw new ClienteNotFoundError(id);
            }

            if (novosDados.nome.trim() === "") {
                throw new ClienteNameInvalidError();
            }
    
            if (!/^\d{11}$/.test(novosDados.cpf.trim())) {
                throw new ClienteCpfInvalidError();
            }
    
            if (!/^\d{11}$/.test(novosDados.telefone.trim())) {
                throw new ClienteTelefoneInvalidError();
            }

            const nome = novosDados.nome.trim().toLowerCase();
            const cpf = novosDados.cpf.trim();
            const telefone = novosDados.telefone;
    
            await this.validarCpfETelefoneRepetidos(cpf, telefone, id);
    
            const clienteAtualizado = await this.repository.atualizarCliente(id, {
                nome,
                cpf,
                telefone,
            });
    
            if(clienteAtualizado === undefined){
                throw new ClienteNotFoundError(id);
            }
    
            return clienteAtualizado;
        }

        public async removerClientePeloId(id: number) : Promise<Cliente>{
            const clienteDeletado = await this.repository.removerClientePeloId(id);
        
            if(clienteDeletado === undefined){
                    throw new ClienteNotFoundError(id);
            }
        
            return clienteDeletado;
        }
}