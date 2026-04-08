import { Relatorio } from "../models/Relatorio";
import { AeronaveService } from "./AeronaveService";

export class RelatorioService {
    constructor(private aeronaveService: AeronaveService) {}

    public emitirRelatorio(codigoAeronave: string, cliente: string, data: string): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            const relatorio = new Relatorio(aeronave, cliente, data);
            relatorio.salvarEmArquivo();
        }
    }
}