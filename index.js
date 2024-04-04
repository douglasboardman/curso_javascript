// EVENT LOOP ////////////////////////////////////////////////////////////////////////////////////////

// Exemplo 1
// async function teste(){
//     const promise1 = new Promise((resolve)=>{
//         resolve("1")
//     });
    
//     const promise2 = new Promise((resolve)=>{
//         resolve("3")
//     });

//     promise1().then()
//     await setTimeout(() => console.log(2), 0);     // Esta função só será executada no proximo loop de eventos, pois se trata de uma função assíncrona.
    
// }

// teste();


// Exemplo 2

// setTimeout(() => {                          // Esta função só será executada no proximo loop de eventos, pois se trata de uma função assíncrona.
//     console.log("setTimout");
// }, 1);

// for(let i = 0; i<= 10000;i++){
//     console.log(i);
// }


// Exemplo 3

// const promise = new Promise(resolve => {    // A execução das promises é agendada para o final do atual loop de eventos, por isso é executado antes do setTimeout.
//     let arr = [];
//     for(let i = 10; i <= 60; i+=10){
//         let random = Math.random();
//         arr.push(Math.round(i*random));
//     }
//     resolve(arr);
// });

// promise.then(arr => console.log(arr));
