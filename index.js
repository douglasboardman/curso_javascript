const axios = require('axios');

const BASE_URL = 'https://pncp.gov.br/api/pncp/v1';
const cnpjIFFar = '10662072000158';
const pathDadosAta = (ano, sequencialCompra, sequencialAta) => `/orgaos/${cnpjIFFar}/compras/${ano}/${sequencialCompra}/atas/${sequencialAta}`; 

async function getData(path) {
    const url = `${BASE_URL}${path}`;
    let response;
    try {
        response = await axios.get(url);
        return response.data
    } catch (error) {
        return error.data;
    }
}

console.time('coletaDadosAta');

getData(pathDadosAta(2023,1,1)).then(
    response => {
        console.log(response);
        console.timeEnd('coletaDadosAta')
    });