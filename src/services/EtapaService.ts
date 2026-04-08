import { StatusEtapa } from "../enums/StatusEtapa";
import { AeronaveService } from "./AeronaveService";

export class EtapaService {
    constructor(private aeronaveService: AeronaveService) {}

    public concluirEtapa(codigoAeronave: string, indiceEtapa: number): boolean {
        const aeronave = this.aeronaveService.buscarPorCodigo(codigoAeronave);
        
        if (!aeronave || !aeronave.etapas) {
            return false;
        }

        const etapas = aeronave.etapas;
        const etapaAtual = etapas[indiceEtapa];

        if (!etapaAtual) {
            console.log("\x1b[31mErro: Etapa não encontrada!\x1b[0m");
            return false;
        }

        if (indiceEtapa > 0) {
            const etapaAnterior = etapas[indiceEtapa - 1];
            if (etapaAnterior && etapaAnterior.status !== StatusEtapa.CONCLUIDA) {
                console.log("\x1b[31mErro: A etapa anterior deve ser concluída primeiro!\x1b[0m");
                return false;
            }
        }

        etapaAtual.finalizar();
        this.aeronaveService.salvarDados();
        return true;
    }
}