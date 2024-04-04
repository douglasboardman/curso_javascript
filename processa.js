//  callback > promise > async/await

const fs = require('fs');
const arqs = ['./arquivos/arq1.txt', './arquivos/arq2.txt'];

function iniNumbers() {
    console.log(1);
    console.log(2);
    console.log(3);
}

function lastNumbers() {
    console.log(7);
    console.log(8);
    console.log(9);
}

function finalNumbers() {
    console.log(13);
    console.log(14);
    console.log(15);
}

async function fileContent(fileUrl) {
    try {
        const result = await new Promise((resolve, reject) => {
            fs.readFile(fileUrl, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return result;
    } catch (error) {
        throw error;
    }
};

async function showNumbers() {
    const midNumbers = await fileContent(arqs[0]);
    const otherNumbers = await fileContent(arqs[1]);
    
    iniNumbers();
    console.log(String(midNumbers));
    lastNumbers();
    console.log(String(otherNumbers));
    finalNumbers();
}

showNumbers();
