import { TipoPeca } from "../enums/TipoPeca";
import { StatusPeca } from "../enums/StatusPeca";

export class Peca {
    constructor(
        private _nome: string,
        private _tipo: TipoPeca,
        private _fornecedor: string,
        private _status: StatusPeca = StatusPeca.EM_PRODUCAO
    ) {}

    get nome(): string { return this._nome; }
    set nome(value: string) { this._nome = value; }

    get tipo(): TipoPeca { return this._tipo; }
    set tipo(value: TipoPeca) { this._tipo = value; }

    get fornecedor(): string { return this._fornecedor; }
    set fornecedor(value: string) { this._fornecedor = value; }

    get status(): StatusPeca { return this._status; }
    set status(value: StatusPeca) { this._status = value; }

    public atualizarStatus(novoStatus: StatusPeca): void {
        this._status = novoStatus;
    }
}