const axios = require("axios");

const BASE_URL = "https://api.portaldatransparencia.gov.br/api-de-dados/licitacoes";
const codOrgao = 26420;
const codLicitacao = '889585757';
const dataInicial = "01/05/2023";
const datafinal = "31/05/2023";

const strPeriodo = (pag) => {
  const dataIni = dataInicial.split('/');
  const dataFim = datafinal.split('/');
  
  let dIni = {
    dia: String(dataIni[0]),
    mes: String(dataIni[1]),
    ano: String(dataIni[2])
  }

  let dFim = {
    dia: String(dataFim[0]),
    mes: String(dataFim[1]),
    ano: String(dataFim[2])
  }
  
  return `?dataInicial=${dIni.dia}%2F${dIni.mes}%2F${dIni.ano}&dataFinal=${dFim.dia}%2F${dFim.mes}%2F${dFim.ano}&codigoOrgao=${codOrgao}&pagina=${pag}`;
}

const axiosOptions = {
  headers: {
    "accept": '/',
    "chave-api-dados": '55c2e0e0e45362fa469aaab45c36751b'
  },
}

const getPage = async (path) => {
  const url = `${BASE_URL}${path}`;

  const content = await axios.get(url, axiosOptions);
  return content;
}

licitacoesPorPeriodo = async () => {
  const dadosLicitacoes = await getPage(strPeriodo(1));
  console.log(dadosLicitacoes.data);
}

licitacaoPorId = async () => {
  const dadosLicitacao = await getPage('/' + codLicitacao);
  console.log(dadosLicitacao.data);
} 

itensLicitacaoPorId = async () => {
   const itensLicitacao = await getPage('/itens-licitados?id=' + codLicitacao);
   console.log(itensLicitacao.data);
}

// itensLicitacaoPorId();

licitacaoPorId();