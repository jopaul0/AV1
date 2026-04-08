import { Aeronave } from "./Aeronave";
import * as fs from 'fs';

export class Relatorio {
    constructor(
        private _aeronave: Aeronave,
        private _cliente: string,
        private _dataEntrega: string
    ) {}

    get aeronave(): Aeronave { return this._aeronave; }
    set aeronave(value: Aeronave) { this._aeronave = value; }

    get cliente(): string { return this._cliente; }
    set cliente(value: string) { this._cliente = value; }

    get dataEntrega(): string { return this._dataEntrega; }
    set dataEntrega(value: string) { this._dataEntrega = value; }

    public gerarRelatorio(): string {
        let rel = `AEROCODE - RELATÓRIO FINAL DE PRODUÇÃO\n`;
        rel += `=======================================\n`;
        rel += `CLIENTE: ${this._cliente}\n`;
        rel += `DATA DE ENTREGA: ${this._dataEntrega}\n`;
        rel += `AERONAVE: ${this._aeronave.modelo} (${this._aeronave.codigo})\n`;
        rel += `PEÇAS INSTALADAS: ${this._aeronave.pecas.length}\n`;
        rel += `STATUS FINAL: ENTREGUE\n`;
        return rel;
    }

    public salvarEmArquivo(): void {
        const nomeArquivo = `relatorio_${this._aeronave.codigo}.txt`;
        const caminho = `./src/data/${nomeArquivo}`;
        fs.writeFileSync(caminho, this.gerarRelatorio(), 'utf-8');
        console.log(`Relatório salvo com sucesso em: ${caminho}`);
    }
}