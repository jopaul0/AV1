import { StatusEtapa } from "../enums/StatusEtapa";
import { Funcionario } from "./Funcionario";

export class Etapa {
    private _funcionarios: Funcionario[] = [];

    constructor(
        private _nome: string,
        private _prazo: string,
        private _status: StatusEtapa = StatusEtapa.PENDENTE
    ) { }

    get nome(): string { return this._nome; }
    set nome(value: string) { this._nome = value; }

    get prazo(): string { return this._prazo; }
    set prazo(value: string) { this._prazo = value; }

    get status(): StatusEtapa { return this._status; }
    set status(value: StatusEtapa) { this._status = value; }

    get funcionarios(): Funcionario[] { return this._funcionarios; }

    public iniciar(): boolean {
        if (this._status === StatusEtapa.PENDENTE) {
            this._status = StatusEtapa.ANDAMENTO;
            return true;
        }
        return false;
    }

    public finalizar(): boolean {
        if (this._status === StatusEtapa.ANDAMENTO) {
            this._status = StatusEtapa.CONCLUIDA;
            return true;
        }
        return false;
    }

    public associarFuncionario(funcionario: Funcionario): void {
        const existe = this._funcionarios.some(f => f.id === funcionario.id);
        if (!existe) {
            this._funcionarios.push(funcionario);
        }
    }

    public listarFuncionarios(): string {
        return this._funcionarios.map(f => `${f.nome} (${f.nivelPermissao})`).join(", ");
    }
}