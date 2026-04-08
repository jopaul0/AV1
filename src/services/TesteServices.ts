import { Teste } from "../models/Teste";
import { AeronaveService } from "./AeronaveService";

export class TesteService {
    constructor(private aeronaveService: AeronaveService) {}

    public registrarTeste(codigoAeronave: string, teste: Teste): void {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        if (aeronave) {
            aeronave.adicionarTeste(teste);
            this.aeronaveService.salvarDados();
        }
    }
}