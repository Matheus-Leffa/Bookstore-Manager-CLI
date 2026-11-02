import { Interface } from "node:readline/promises";

export async function lerNumero(entrada: Interface, mensagem: string): Promise<number | undefined> {
    const valor = (await entrada.question(mensagem)).trim();
    const numero = Number(valor);

    if (valor === "" || !Number.isInteger(numero) || numero < 1) {
        console.log("Digite um número inteiro positivo.");
        return undefined;
    }

    return numero;
}

export function exibirErro(erro: unknown): void {
    console.error(erro instanceof Error ? erro.message : "Não foi possível concluir a operação.");
}
