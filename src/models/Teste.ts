import { TipoTeste } from "../enums/TipoTeste";
import { ResultadoTeste } from "../enums/ResultadoTeste";

export class Teste {
    constructor(
        private _tipo: TipoTeste,
        private _resultado: ResultadoTeste
    ) {}

    get tipo(): TipoTeste { return this._tipo; }
    set tipo(value: TipoTeste) { this._tipo = value; }

    get resultado(): ResultadoTeste { return this._resultado; }
    set resultado(value: ResultadoTeste) { this._resultado = value; }
}