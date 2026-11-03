import { Autor } from "../models/Autor";

export interface AtualizarLivroDTO{
    nome: string;
    isbn: string;
    autor: Autor;
}