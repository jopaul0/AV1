import * as readline from 'readline';
import { AeronaveService } from './services/AeronaveService';
import { FuncionarioService } from './services/FuncionarioService';
import { EtapaService } from './services/EtapaService';
import { PecaService } from './services/PecaService';
import { TesteService } from './services/TesteServices';
import { RelatorioService } from './services/RelatorioServices';
import { Funcionario } from './models/Funcionario';
import { NivelPermissao } from './enums/NivelPermissao';
import { TipoAeronave } from './enums/TipoAeronave';
import { Aeronave } from './models/Aeronave';
import { TipoTeste } from './enums/TipoTeste';
import { Teste } from './models/Teste';
import { ResultadoTeste } from './enums/ResultadoTeste';
import { TipoPeca } from './enums/TipoPeca';
import { Peca } from './models/Peca';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const aeronaveService = new AeronaveService();
const funcionarioService = new FuncionarioService();
const etapaService = new EtapaService(aeronaveService);
const pecaService = new PecaService(aeronaveService);
const testeService = new TesteService(aeronaveService);
const relatorioService = new RelatorioService(aeronaveService);

let usuarioLogado: Funcionario | null = null;

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
};

async function iniciarSistema() {
    console.log("\n✈️  BEM-VINDO AO AEROCODE - SISTEMA DE GESTÃO");
    await menuLogin();
}

async function menuLogin() {
    console.log("\n--- LOGIN ---");
    const user = await question("Usuário: ");
    const pass = await question("Senha: ");

    const func = funcionarioService.login(user, pass);
    if (func) {
        usuarioLogado = func;
        console.log(`\n✅ Login realizado como: ${func.nome} (${func.nivelPermissao})`);
        await menuPrincipal();
    } else {
        console.log("\x1b[31m❌ Credenciais inválidas!\x1b[0m");
        await menuLogin();
    }
}

async function menuPrincipal() {
    console.log("\n--- MENU PRINCIPAL ---");
    console.log("1. Gestão de Aeronaves");
    console.log("2. Gestão de Produção (Peças/Etapas)");
    console.log("3. Testes e Qualidade");
    console.log("4. Relatórios e Finalização");
    console.log("5. Gestão de Usuários");
    console.log("0. Sair");

    const opcao = await question("Escolha uma opção: ");

    switch (opcao) {
        case "1": await menuAeronaves(); break;
        case "2": await menuProducao(); break;
        case "3": await menuTestes(); break;
        case "4": await menuRelatorios(); break;
        case "5": await menuGerenciarUsuarios(); break;
        case "0": process.exit(0);
        default:
            console.log("Opção inválida!");
            await menuPrincipal();
    }
}

async function menuAeronaves() {
    if (usuarioLogado?.nivelPermissao !== NivelPermissao.ADMINISTRADOR) {
        console.log("\x1b[31m⛔ Acesso Negado: Apenas Administradores.\x1b[0m");
        return menuPrincipal();
    }

    console.log("\n--- GESTÃO DE AERONAVES ---");
    console.log("1. Cadastrar Aeronave");
    console.log("2. Listar Todas");
    console.log("3. Voltar");

    const opcao = await question("Opção: ");
    if (opcao === "1") {
        const cod = await question("Código: ");
        const mod = await question("Modelo: ");
        const tipoInput = await question("Tipo (1-Comercial, 2-Militar): ");
        const cap = parseInt(await question("Capacidade: "));
        const alc = parseInt(await question("Alcance (km): "));
        const tipo = tipoInput === "1" ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;

        const novaAero = new Aeronave(cod, mod, tipo, cap, alc);
        if (aeronaveService.cadastrar(novaAero)) {
            console.log("✅ Aeronave cadastrada!");
        }
    } else if (opcao === "2") {
        aeronaveService.listarTodas().forEach(a => a.exibirDetalhes());
    }
    await menuPrincipal();
}

async function menuProducao() {
    console.log("\n--- GESTÃO DE PRODUÇÃO ---");
    const cod = await question("Código da Aeronave: ");
    const aero = aeronaveService.buscarPorCodigo(cod);

    if (!aero) {
        console.log("❌ Aeronave não encontrada.");
        return menuPrincipal();
    }

    console.log("1. Adicionar Peça");
    console.log("2. Iniciar Etapa");
    console.log("3. Concluir Etapa");
    const opcao = await question("Opção: ");

    if (opcao === "1") {
        const nome = await question("Nome da Peça: ");
        const tipo = (await question("Tipo (1-Nacional, 2-Importada): ")) === "1" ? TipoPeca.NACIONAL : TipoPeca.IMPORTADA;
        const forn = await question("Fornecedor: ");
        pecaService.adicionarPeca(cod, new Peca(nome, tipo, forn));
        console.log("✅ Peça adicionada!");
    }
    else if (opcao === "2" || opcao === "3") {
        aero.etapas.forEach((e, i) => console.log(`${i} - ${e.nome} [${e.status}]`));
        const index = parseInt(await question("Índice da etapa: "));

        if (opcao === "2") {
            if (aero.etapas[index]?.iniciar()) {
                aeronaveService.salvarDados();
                console.log("✅ Etapa iniciada (ANDAMENTO)!");
            }
        } else {
            if (etapaService.concluirEtapa(cod, index)) {
                console.log("✅ Etapa concluída!");
            }
        }
    }
    await menuPrincipal();
}

async function menuTestes() {
    console.log("\n--- TESTES E QUALIDADE ---");
    const cod = await question("Código da Aeronave: ");
    const aero = aeronaveService.buscarPorCodigo(cod);

    if (!aero) {
        console.log("\x1b[31m❌ Aeronave não encontrada.\x1b[0m");
        return menuPrincipal();
    }

    console.log("1. Registrar Teste Elétrico");
    console.log("2. Registrar Teste Hidráulico");
    console.log("3. Registrar Teste Aerodinâmico");
    console.log("4. Voltar");

    const opcao = await question("Opção: ");

    let tipo: TipoTeste | null = null;
    if (opcao === "1") tipo = TipoTeste.ELETRICO;
    else if (opcao === "2") tipo = TipoTeste.HIDRAULICO;
    else if (opcao === "3") tipo = TipoTeste.AERODINAMICO;

    if (tipo) {
        const resInput = await question("Resultado (1-Aprovado, 2-Reprovado): ");
        const resultado = resInput === "1" ? ResultadoTeste.APROVADO : ResultadoTeste.REPROVADO;

        const novoTeste = new Teste(tipo, resultado);
        testeService.registrarTeste(cod, novoTeste);
        console.log("✅ Teste registrado com sucesso!");
    }

    await menuPrincipal();
}


async function menuRelatorios() {
    console.log("\n--- RELATÓRIOS E FINALIZAÇÃO ---");
    const cod = await question("Código da Aeronave para entrega: ");
    const aero = aeronaveService.buscarPorCodigo(cod);

    if (!aero) {
        console.log("\x1b[31m❌ Aeronave não encontrada.\x1b[0m");
        return menuPrincipal();
    }

    console.log(`Aeronave selecionada: ${aero.modelo}`);
    const cliente = await question("Nome do Cliente: ");
    const data = await question("Data de Entrega (DD/MM/AAAA): ");

    const confirmar = await question(`Deseja gerar o relatório final para ${cliente}? (s/n): `);

    if (confirmar.toLowerCase() === 's') {
        relatorioService.emitirRelatorio(cod, cliente, data);
        console.log("\x1b[32m✅ Processo concluído! O arquivo foi gerado na pasta 'data'.\x1b[0m");
    }

    await menuPrincipal();
}

async function menuGerenciarUsuarios() {
    if (usuarioLogado?.nivelPermissao !== NivelPermissao.ADMINISTRADOR) {
        console.log("\x1b[31m⛔ Acesso Negado: Apenas Administradores podem gerenciar usuários.\x1b[0m");
        return menuPrincipal();
    }

    console.log("\n--- GESTÃO DE USUÁRIOS ---");
    console.log("1. Cadastrar Novo Funcionário");
    console.log("2. Voltar");

    const opcao = await question("Escolha uma opção: ");

    if (opcao === "1") {
        const id = parseInt(await question("ID (Número único): "));
        const nome = await question("Nome Completo: ");
        const tel = await question("Telefone: ");
        const end = await question("Endereço: ");
        const user = await question("Nome de Usuário (Login): ");
        const senha = await question("Senha: ");
        
        console.log("Níveis: 1-Administrador, 2-Engenheiro, 3-Operador");
        const nivelInput = await question("Escolha o nível: ");
        
        let nivel = NivelPermissao.OPERADOR;
        if (nivelInput === "1") nivel = NivelPermissao.ADMINISTRADOR;
        else if (nivelInput === "2") nivel = NivelPermissao.ENGENHEIRO;

        const novoFunc = new Funcionario(id, nome, tel, end, user, senha, nivel);
        
        funcionarioService.cadastrar(novoFunc);
        console.log("\x1b[32m✅ Funcionário cadastrado com sucesso!\x1b[0m");
    }

    await menuPrincipal();
}

iniciarSistema();