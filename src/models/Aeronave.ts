import { TipoAeronave } from "../enums/TipoAeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";

export class Aeronave {
    private _pecas: Peca[] = [];
    private _etapas: Etapa[] = [];
    private _testes: Teste[] = [];

    constructor(
        private _codigo: string,
        private _modelo: string,
        private _tipo: TipoAeronave,
        private _capacidade: number,
        private _alcance: number
    ) {}

    get codigo(): string { return this._codigo; }
    set codigo(value: string) { this._codigo = value; }

    get modelo(): string { return this._modelo; }
    set modelo(value: string) { this._modelo = value; }

    get tipo(): TipoAeronave { return this._tipo; }
    set tipo(value: TipoAeronave) { this._tipo = value; }

    get capacidade(): number { return this._capacidade; }
    set capacidade(value: number) { this._capacidade = value; }

    get alcance(): number { return this._alcance; }
    set alcance(value: number) { this._alcance = value; }

    get pecas(): Peca[] { return this._pecas; }
    get etapas(): Etapa[] { return this._etapas; }
    get testes(): Teste[] { return this._testes; }

    public exibirDetalhes(): void {
        console.log(`\n=== DETALHES DA AERONAVE: ${this._codigo} ===`);
        console.log(`Modelo: ${this._modelo} | Tipo: ${this._tipo}`);
        console.log(`Capacidade: ${this._capacidade} | Alcance: ${this._alcance}km`);
        console.log(`Peças: ${this._pecas.length} | Testes: ${this._testes.length}`);
        console.log(`-------------------------------------------`);
    }
}