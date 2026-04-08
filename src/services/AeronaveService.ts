import { Aeronave } from "../models/Aeronave";
import { Peca } from "../models/Peca";
import { Etapa } from "../models/Etapa";
import { Teste } from "../models/Teste";
import { Persistencia } from "../utils/persistencia";

export class AeronaveService {
    private _aeronaves: Aeronave[] = [];
    private readonly FILE_NAME = "aeronaves";

    constructor() {
        this.carregarDados();
    }

    public cadastrar(aeronave: Aeronave): boolean {
        if (this.buscarPorCodigo(aeronave.codigo)) {
            return false;
        }
        this._aeronaves.push(aeronave);
        this.salvarDados();
        return true;
    }

    public buscarPorCodigo(codigo: string): Aeronave | undefined {
        return this._aeronaves.find(a => a.codigo === codigo);
    }

    public listarTodas(): Aeronave[] {
        return this._aeronaves;
    }

    public salvarDados(): void {
        Persistencia.salvar(this.FILE_NAME, this._aeronaves);
    }

    private carregarDados(): void {
        const dados = Persistencia.carregar(this.FILE_NAME);
        this._aeronaves = dados.map((a: any) => {
            const aero = new Aeronave(a._codigo, a._modelo, a._tipo, a._capacidade, a._alcance);

            if (a._etapas) {
                a._etapas.forEach((e: any) => {
                    const etapa = new Etapa(e._nome, e._prazo, e._status);
                    aero.adicionarEtapa(etapa);
                });
            }

            if (a._pecas) {
                a._pecas.forEach((p: any) => {
                    const peca = new Peca(p._nome, p._tipo, p._fornecedor, p._status);
                    aero.adicionarPeca(peca);
                });
            }

            return aero;
        });
    }
}