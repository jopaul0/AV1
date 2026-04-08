import { Peca } from "../models/Peca";
import { AeronaveService } from "./AeronaveService";

export class PecaService {
    constructor(private aeronaveService: AeronaveService) {}

    public adicionarPeca(codigoAeronave: string, peca: Peca): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            aeronave.adicionarPeca(peca);
            this.aeronaveService.salvarDados();
        }
    }
}