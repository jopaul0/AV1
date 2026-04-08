import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Persistencia {
    private static DATA_DIR = path.resolve(__dirname, '../../src/data');

    static salvar(nomeArquivo: string, dados: any): void {
        if (!fs.existsSync(this.DATA_DIR)) fs.mkdirSync(this.DATA_DIR);
        const caminho = path.join(this.DATA_DIR, `${nomeArquivo}.txt`);
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
    }

    static carregar(nomeArquivo: string): any {
        const caminho = path.join(this.DATA_DIR, `${nomeArquivo}.txt`);
        if (fs.existsSync(caminho)) {
            return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
        }
        return [];
    }
}