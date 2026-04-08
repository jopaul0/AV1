import { AeronaveService } from './services/AeronaveService.js';
import { FuncionarioService } from './services/FuncionarioService.js';
import { EtapaService } from './services/EtapaService.js';
import { PecaService } from './services/PecaService.js';
import { RelatorioService } from './services/RelatorioServices.js';
import { Aeronave } from './models/Aeronave.js';
import { Etapa } from './models/Etapa.js';
import { Peca } from './models/Peca.js';
import { TipoAeronave } from './enums/TipoAeronave.js';
import { TipoPeca } from './enums/TipoPeca.js';

async function rodarTestes() {
    console.log("🧪 Iniciando Testes Funcionais do Aerocode...\n");

    const aeroService = new AeronaveService();
    const funcService = new FuncionarioService();
    const etapaService = new EtapaService(aeroService);
    const pecaService = new PecaService(aeroService);
    const relService = new RelatorioService(aeroService);

    let falhas = 0;

    const assert = (condicao: boolean, mensagem: string) => {
        if (condicao) {
            console.log(`✅ [PASSOU] ${mensagem}`);
        } else {
            console.log(`❌ [FALHOU] ${mensagem}`);
            falhas++;
        }
    };

    // --- TESTE 1: Autenticação ---
    const loginSucesso = funcService.login("admin", "123");
    assert(loginSucesso !== null, "Login com administrador padrão");

    // --- TESTE 2: Cadastro de Aeronave ---
    const codTeste = `TEST-${Date.now()}`;
    const novaAero = new Aeronave(codTeste, "Boeing Teste", TipoAeronave.COMERCIAL, 100, 2000);
    const cadastrou = aeroService.cadastrar(novaAero);
    assert(cadastrou === true, "Cadastro de nova aeronave");

    // --- TESTE 3: Adição de Peças e Etapas ---
    const peca = new Peca("Asa Esquerda", TipoPeca.NACIONAL, "Embraer");
    pecaService.adicionarPeca(codTeste, peca);
    
    const aeroRecuperada = aeroService.buscarPorCodigo(codTeste);
    assert(aeroRecuperada?.pecas.length === 1, "Adição de peça à aeronave");

    const etapa1 = new Etapa("Montagem Estrutural", "5 dias");
    const etapa2 = new Etapa("Pintura", "2 dias");
    aeroRecuperada?.adicionarEtapa(etapa1);
    aeroRecuperada?.adicionarEtapa(etapa2);
    aeroService.salvarDados();

    // --- TESTE 4: Validação de Regra de Negócio (Etapas) ---
    console.log("\nVerificando regra de ordem das etapas...");
    const tentouPularEtapa = etapaService.concluirEtapa(codTeste, 1);
    assert(tentouPularEtapa === false, "Impedir conclusão de etapa fora de ordem");

    const concluiuCorreto = etapaService.concluirEtapa(codTeste, 0);
    assert(concluiuCorreto === true, "Concluir primeira etapa com sucesso");

    // --- TESTE 5: Geração de Relatório ---
    try {
        relService.emitirRelatorio(codTeste, "Cliente Teste", "08/04/2026");
        console.log("✅ [PASSOU] Emissão de relatório sem erros");
    } catch (e) {
        console.log("❌ [FALHOU] Erro ao emitir relatório");
        falhas++;
    }

    console.log("\n-------------------------------------------");
    if (falhas === 0) {
        console.log("🚀 TODOS OS TESTES PASSARAM COM SUCESSO!");
    } else {
        console.log(`⚠️  TESTES FINALIZADOS COM ${falhas} FALHA(S).`);
    }
    process.exit(falhas > 0 ? 1 : 0);
}

rodarTestes();