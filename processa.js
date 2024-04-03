//  callback > promise > async/await

const fs = require('fs');

console.log(1)

// function callback(err, contents) {
//     console.log(err, String(contents));
// }

// fs.readFile('./arquivos/pessoas.csv', (err, contents) => {
//     fs.readFile('./arquivos/mulheres.csv', (err, contents2) => {
//         console.log(err, String(contents))
//         console.log(err, String(contents2))
//     })
// })

const read = fileUrl => new Promise((resolve, reject) => {
    fs.readFile(fileUrl, (err, contents) => {
        if(err) reject(err);
        resolve(contents);
    });
})

read('./arquivos/mulheres.csv')
    .then(result => console.log(String(result)))

console.log(2);

console.log(3);