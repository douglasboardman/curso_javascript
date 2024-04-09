// API UI: https://pncp.gov.br/api/pncp/swagger-ui/index.html

const axios = require('axios');
const ata = require('./ata_model.js');
const fs = require('fs');

const BASE_URL = 'https://pncp.gov.br/api/pncp/v1';
const cnpjIFFar = '10662072000158';
const pathDadosAta = (ano, sequencialCompra, sequencialAta) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}/atas/${sequencialAta}`; 
const atasPorCompra = (ano, sequencialCompra) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}/atas?pagina=1&tamanhoPagina=10`;
const pathDadosCompra = (ano, sequencialCompra) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}`;


const axiosOptions = {
    headers: {
      "accept": '*/*'
  }
}


async function getData(path) {
    const url = `${BASE_URL}${path}`;
    let response;
    try {
        response = await axios.get(url, axiosOptions);
        return {error: false, message: 'Dados coletados com sucesso!', data: response.data};
    } catch (error) {
        return {error: true, message: error.message, data: []};
    }
}



// getData(pathDadosAta(2023,25,1)).then(
//     response => {
//         console.log(response.message);
//         console.timeEnd('coletaDadosAta')
//     });
// console.time('coletaDadosAta');
// getData(pathDadosCompra(2023,24)).then(
//     response => {
//         // let compra = response.data.ata.compra;
//         console.log(response.data);
//         //console.log(response.data);
//         console.timeEnd('coletaDadosAta');
//     }
// )

async function coletaSequenciaisComprasPorAno(ano) {
    console.time('coletaSequenciaisComprasPorAno');
    let sequenciaisCompras = [];
    let dadosCompras = [];
    for(let i = 14; i <= 100; i++) {
        console.time('coletaSequencialCompra');
        const result = await getData(pathDadosCompra(ano,i));
        if(!result.error){
            const modalidade = result.data.modalidadeId;
            const sequencialCompra = i;
            let compra = {}
            if (modalidade == 6) {
                sequenciaisCompras.push(sequencialCompra);
                compra.numCompra = result.data.numeroCompra;
                compra.anoCompra = ano;
                compra.objetoCompra = result.data.objetoCompra;
                compra.modalidade = result.data.modalidadeNome;
                compra.valorTotal = result.data.valorTotalHomologado; 
                dadosCompras.push(compra);
            }
            console.log('Sequencial da Compra: ' + sequencialCompra);
            console.log('Modalidade: ' + modalidade + '\n' + 'Dados da Compra:' + '\n' + compra);
        }
        console.timeEnd('coletaSequencialCompra');
    }
    console.log(sequenciaisCompras);
    console.log(dadosCompras);
    console.log('Busca de dados concluída!');
    console.timeEnd('coletaSequenciaisComprasPorAno');
}

async function coletarAtasPorAno(ano) {
    console.time('coletaAtasPorAno');
    for(let i = 1; i <= 100; i++) {
        console.time('salvaDadosCompra');
        const result = await getData(pathDadosCompra(2023,i));
        if(!result.error){
            let a = new ata();
            let data = result.data
            a.anoCompra = ano;
            a.sequencialCompra = i;
            a.sequencialAta = 1;
            a.iniVigencia = new Date(data.dataVigenciaInicio);
            a.fimVigencia = new Date(data.dataVigenciaFim);
            a.numControlePNCP = data.numeroControlePNCP;
            a.numCompra = data.ata.compra.numeroCompra;
            a.numAta = data.numeroAtaRegistroPreco;
            a.modalidade = data.ata.compra.modalidade.nome;
            a.objetoCompra = data.ata.compra.objetoCompra;

            await gravarArquivoCSV(a, `Dados Compra ${a.numCompra}-${a.anoCompra}`);
            console.log(`Dados Compra ${a.numCompra}-${a.anoCompra} gravado com sucesso!`);
            console.timeEnd('salvaDadosCompra');
        } else {
            console.log(result.message);
            console.timeEnd('salvaDadosCompra');
        }
    }
    console.log('Busca de dados concluída!');
    console.timeEnd('coletaAtasPorAno');
}

async function gravarArquivoCSV(dados, nomeArquivo) {
    const csvContent = contentToCSV(dados);
    try {
        await fs.writeFileSync(`./atas/${nomeArquivo}.csv`, csvContent);
    } catch (error) {
        console.log(error);
    }
}

function contentToCSV(dados) {
    let result = Object.keys(dados[0]).map(key => `"${key}"`).join(';') + '\r\n';
    
    result += dados.map(obj =>
        Object.keys(obj).map(key => {
            let value = obj[key]
            return typeof value === 'string' ? `"${value}"` : value
        }).join(';')
    ).join('\r\n');

    return result;
}

coletaSequenciaisComprasPorAno(2022);
