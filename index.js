const axios = require('axios');
const puppeteer = require('puppeteer');

const BASE_URL = 'https://pncp.gov.br';
const cnpjIFFar = '10662072000158';
const ano = '2022';
const sequencial = '1';
const url = `${BASE_URL}/app/editais/${cnpjIFFar}/${ano}/${sequencial}`;

async function coletaCodPNCP(data) {
    const rgxCodPNCP = /\d{14}-\d-\d{6}\/\d{4}/;
    const matches = String(data).match(rgxCodPNCP);
    return matches[0];
}

// coletaCodPNCP(1);

async function getData() {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const data = await page.content();
    await browser.close();
    return data;
}

console.time('coletaCodPNCP');

getData().then(
    data => coletaCodPNCP(data).then(codPNCP => {
        console.log(codPNCP);
        console.timeEnd('coletaCodPNCP');
    })
);