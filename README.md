# AV1: Aerocode — Sistema de Gestão de Produção de Aeronaves

## Visão Geral do Projeto

Sistema **command-line interface (CLI)** desenvolvido em **TypeScript**, compatível com:
- Windows 10 ou superior
- Linux Ubuntu 24.04.03 ou superior (e derivados)

O sistema simula o processo de produção de uma aeronave desde o cadastro inicial até a entrega final ao cliente, com persistência de dados em **arquivos de texto**.

---

## Arquitetura — Entidades Principais

| Entidade | Responsabilidade |
|---|---|
| `Aeronave` | Representa cada aeronave produzida |
| `Peca` | Componentes que compõem a aeronave |
| `Etapa` | Fases do processo de produção |
| `Funcionario` | Mão de obra envolvida na produção |
| `Teste` | Testes realizados nas aeronaves |
| `Relatorio` | Relatório final da aeronave para entrega |

### Enumerações

| Enum | Valores |
|---|---|
| `TipoAeronave` | `COMERCIAL`, `MILITAR` |
| `TipoPeca` | `NACIONAL`, `IMPORTADA` |
| `StatusPeca` | `EM_PRODUCAO`, `EM_TRANSPORTE`, `PRONTA` |
| `StatusEtapa` | `PENDENTE`, `ANDAMENTO`, `CONCLUIDA` |
| `NivelPermissao` | `ADMINISTRADOR`, `ENGENHEIRO`, `OPERADOR` |
| `TipoTeste` | `ELETRICO`, `HIDRAULICO`, `AERODINAMICO` |
| `ResultadoTeste` | `APROVADO`, `REPROVADO` |

---

## Estrutura do projeto

```
aerocode/
├── src/
│   ├── enums/
│   │   ├── TipoAeronave.ts
│   │   ├── TipoPeca.ts
│   │   ├── StatusPeca.ts
│   │   ├── StatusEtapa.ts
│   │   ├── NivelPermissao.ts
│   │   ├── TipoTeste.ts
│   │   └── ResultadoTeste.ts
│   ├── models/
│   │   ├── Aeronave.ts
│   │   ├── Peca.ts
│   │   ├── Etapa.ts
│   │   ├── Funcionario.ts
│   │   ├── Teste.ts
│   │   └── Relatorio.ts
│   ├── services/
│   │   ├── AeronaveService.ts
│   │   ├── PecaService.ts
│   │   ├── EtapaService.ts
│   │   ├── FuncionarioService.ts
│   │   ├── TesteService.ts
│   │   └── RelatorioService.ts
│   ├── utils/
│   │   ├── cli.ts          # helpers de input/output
│   │   └── persistencia.ts # salvar/carregar arquivos
│   ├── data/               # arquivos de persistência .txt
│   └── index.ts            # ponto de entrada
├── tsconfig.json
├── package.json
└── README.md
```

---

## Tecnologias

- **Linguagem:** TypeScript
- **Runtime:** Node.js
- **Interface:** CLI via módulo `readline`
- **Persistência:** `fs` (sistema de arquivos) — arquivos `.txt` em formato ASCII
- **Compilação:** `tsc` (TypeScript Compiler)
