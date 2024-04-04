import { pessoas } from './bd.mjs';
import { writeFile } from 'fs';


async function pessoasMaiores(pessoas) {
    try {
        const lista = await Promise.resolve(pessoas.filter(p => p.idade >= 18));
        return lista;
    } catch (error) {
        throw error;
    }
}

async function pessoasMenores(pessoas) {
    try {
        const lista = await Promise.resolve(pessoas.filter(p => p.idade < 18));
        return lista;
    } catch (error) {
        throw error;
    }
}

async function listarPorGenero(genero, pessoas) {
    try {
        const lista = await Promise.resolve(pessoas.filter(p => p.sexo == genero));
        return lista;
    } catch (error) {
        throw error;
    }
}

async function pessoasOrganizadasPorSexo(pessoas) {
    try {
        const lista = await Promise.resolve(pessoas.reduce(function(acumulador, itemAtual) {
            if(itemAtual.sexo == "Masculino") {
                acumulador.homens.push(itemAtual);
            } else {
                acumulador.mulheres.push(itemAtual);
            }
            return acumulador;
        }, {homens: [], mulheres: []}));
        return lista;
    } catch (error) {
        throw error;
    }
}

async function contentToCSV(dados) {
    let keys = Object.keys(dados[0]);
    let headers = keys.join(",") + "\n";
    let bodyData = dados.map(dados => `${dados.nome},${dados.sexo},${dados.idade}`).join("\n");
    return headers.toUpperCase() + bodyData;
}

async function gravarArquivoCSV(csvContent, nomeArquivo) {
    try {
        await new Promise((resolve, reject) => {
            writeFile(`./arquivos/${nomeArquivo}.csv`, csvContent, (err) => { if(err) reject(err); resolve(); });
        });
        return 'Arquivo salvo com sucesso!';
    } catch (error) {
        throw error
    }
}


// lista de pessoas maiores de idade organizadas por sexo
// (async () => console.log(await pessoasMaiores(pessoas)
//     .then(pessoasOrganizadasPorSexo)))();

// (async () => console.log(await pessoasMenores(pessoas)
//     .then(pessoasOrganizadasPorSexo)))();

// (async () => console.log(await gravarArquivoCSV(await contentToCSV(pessoas), 'pessoas')))();

(async () => console.log(await listarPorGenero("Masculino", pessoas)
    .then(async result => gravarArquivoCSV(await contentToCSV(result),"homens"))))();

//console.log(await contentToCSV(pessoas));



