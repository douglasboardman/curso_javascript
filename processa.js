//  callback > promise > async/await

const fs = require('fs');
const arqs = ['./arquivos/arq1.txt', './arquivos/arq2.txt'];

const iniNumbers = new Promise((resolve) => {
    resolve(
        console.log(1),
        console.log(2),
        console.log(3)
    );
});

const lastNumbers = new Promise((resolve) => {
    resolve(
        console.log(7),
        console.log(8),
        console.log(9)
    );
})

const fileUrl = './arquivos/arq1.txt';

const fileContent = new Promise((resolve, reject) => {
    return fs.readFile(fileUrl, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

iniNumbers
    .then(fileContent
        .then(result => console.log(String(result)))
            .then(lastNumbers));