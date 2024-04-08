// API UI: https://pncp.gov.br/api/pncp/swagger-ui/index.html

const axios = require('axios');

const BASE_URL = 'https://pncp.gov.br/api/pncp/v1';
const cnpjIFFar = '10662072000158';
const pathDadosAta = (ano, sequencialCompra, sequencialAta) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}/atas/${sequencialAta}`; 

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

getData(pathDadosAta(2023,25,1)).then(
    response => {
        console.log(response.message);
        console.timeEnd('coletaDadosAta')
    });