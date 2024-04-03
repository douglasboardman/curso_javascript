import { pessoas } from './bd.mjs';
import { writeFile,  } from 'fs';


function pessoasMaiores(pessoas) {
    return new Promise((resolve, reject) => {
        try {
            const lista = pessoas.filter(p => p.idade >= 18);
            resolve(lista);
        } catch (error) {
            reject(error);
        }
    });
}

function pessoasMenores(pessoas) {
    return new Promise((resolve, reject) => {
        try {
            const lista = pessoas.filter(p => p.idade < 18);
            resolve(lista);
        } catch (error) {
            reject(error);
        }
    });
}

function listarPorGenero(genero, pessoas) {
    return new Promise((resolve, reject) => {
        try {
            const lista = pessoas.filter(p => p.sexo == genero);
            resolve(lista);
        } catch (error) {
            reject(error);
        }
    });
}

function pessoasOrganizadasPorSexo(pessoas) {
    return new Promise((resolve, reject) => {
        try {
            const lista = pessoas.reduce(function(acumulador, itemAtual) {
                if(itemAtual.sexo == "Masculino") {
                    acumulador.homens.push(itemAtual);
                } else {
                    acumulador.mulheres.push(itemAtual);
                }
                return acumulador;
            }, {homens: [], mulheres: []});
            resolve(lista);
        } catch (error) {
            reject(error);
        }
    });
}

function contentToCSV(dados) {
    let keys = Object.keys(dados[0]);
    let headers = keys.join(",") + "\n";
    let bodyData = dados.map(dados => `${dados.nome},${dados.sexo},${dados.idade}`).join("\n");
    return headers.toUpperCase() + bodyData;
}

function gravarArquivoCSV(csvContent, nomeArquivo) {
    return new Promise((resolve, reject) => {
        try {
            
            writeFile(`./arquivos/${nomeArquivo}.csv`, csvContent, (err) => { if(err) throw err });
            resolve('Arquivo salvo com sucesso!');
        } catch (error) {
            reject(error)
        }
    })
}


// lista de pessoas maiores de idade organizadas por sexo
// pessoasMaiores(pessoas)
//     .then(pessoasOrganizadasPorSexo)
//     .then(resultado => console.log(resultado));

// pessoasMenores(pessoas)
//     .then(pessoasOrganizadasPorSexo)
//     .then(resultado => console.log(resultado));

// gravarArquivoCSV(contentToCSV(pessoas), 'pessoas')
//     .then(result => console.log(result));

listarPorGenero("Feminino", pessoas)
    .then(result => gravarArquivoCSV(contentToCSV(result),"mulheres"))
    .then(result => console.log(result));

//console.log(contentToCSV(pessoas));



