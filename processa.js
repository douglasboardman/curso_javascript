//  callback > promise > async/await

const fs = require('fs');
const arqs = ['./arquivos/arq1.txt', './arquivos/arq2.txt'];

// function callback(err, contents) {
    //     console.log(err, String(contents));
    // }
    
    // fs.readFile('./arquivos/pessoas.csv', (err, contents) => {
        //     fs.readFile('./arquivos/mulheres.csv', (err, contents2) => {
            //         console.log(err, String(contents))
            //         console.log(err, String(contents2))
            //     })
            // })
            
// const read = fileUrl => new Promise((resolve, reject) => {
//     fs.readFile(fileUrl, (err, contents) => {
//         if(err) reject(err);
//         resolve(contents);
//     });
// })

const read = fileUrl => {
    fs.readFile(fileUrl, (err, contents) => {
        if(err) console.log(err);
        return contents;
    });
}

// read('./arquivos/mulheres.csv')
//     .then(result => console.log(String(result)))
console.log(1)

console.log(2);

console.log(3);

console.log(read(arqs[0]));

console.log(7);

console.log(8);

console.log(9);

console.log(read(arqs[1]));