// API UI: https://pncp.gov.br/api/pncp/swagger-ui/index.html

const axios = require('axios');
const ata = require('./ata_model.js');
const fs = require('fs');

const BASE_URL = 'https://pncp.gov.br/api/pncp/v1';
const cnpjIFFar = '10662072000158';
const pathDadosAta = (ano, sequencialCompra, sequencialAta) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}/atas/${sequencialAta}`; 
const atasPorCompra = (ano, sequencialCompra) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}/atas?pagina=1&tamanhoPagina=10`;



async function getData(path) {
    const url = `${BASE_URL}${path}`;
    let response;
    try {
        response = await axios.get(url);
        return {error: false, message: 'Dados coletados com sucesso!', data: response.data};
    } catch (error) {
        return {error: true, message: error.message, data: []};
    }
}

console.time('coletaDadosAta');

// getData(pathDadosAta(2023,25,1)).then(
//     response => {
//         console.log(response.message);
//         console.timeEnd('coletaDadosAta')
//     });

getData(atasPorCompra(2023, 27)).then(
    response => {
        console.log(response.data);
        console.timeEnd('coletaDadosAta');
    }
)

function coletarAtasPorAno(ano) {
    getData(atasPorCompra(ano, 27)).then(
        response => {
            console.log(response.data);
            console.timeEnd('coletaDadosAta');
        }
    )
}

async function gravarArquivoCSV(dados, nomeArquivo) {
    const csvContent = contentToCSV(dados);
    try {
        await fs.writeFileSync(`./arquivos/${nomeArquivo}.csv`, csvContent);
    } catch (error) {
        console.log(error);
    }
}

async function acrescentarNoArquivoCSV(dados, nomeArquivo) {
    
}

function contentToCSV(dados, headers) {
    let result;
    let header = "";

    if (headers){
        header = Object.keys(dados[0]).map(key => `"${key}"`).join(';') + '\r\n';
    }

    result = header += dados.map(obj =>
        Object.keys(obj).map(key => {
            let value = obj[key]
            return typeof value === 'string' ? `"${value}"` : value
        }).join(';')
    ).join('\r\n');

    return result;
}

