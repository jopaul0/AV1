import { Funcionario } from "../models/Funcionario";
import { Persistencia } from "../utils/persistencia";

export class FuncionarioService {
    private _funcionarios: Funcionario[] = [];
    private readonly FILE_NAME = "funcionarios";

    constructor() {
        this.carregarDados();
    }

    public cadastrar(funcionario: Funcionario): void {
        this._funcionarios.push(funcionario);
        this.salvarDados();
    }

    public login(usuario: string, senha: string): Funcionario | null {
        const func = this._funcionarios.find(f => f.usuario === usuario);
        if (func && func.autenticar(usuario, senha)) {
            return func;
        }
        return null;
    }

    public buscarPorId(id: number): Funcionario | undefined {
        return this._funcionarios.find(f => f.id === id);
    }

    private salvarDados(): void {
        Persistencia.salvar(this.FILE_NAME, this._funcionarios);
    }

    private carregarDados(): void {
        const dados = Persistencia.carregar(this.FILE_NAME);
        this._funcionarios = dados.map((f: any) => 
            new Funcionario(f._id, f._nome, f._telefone, f._endereco, f._usuario, f._senha, f._nivelPermissao)
        );
    }
}