// // operação assíncrona em JavaScript com callbacks

// function doSomethingAsync(callback) {
//     setTimeout(function() {
//         console.log("Operação assíncrona concluída!");
//         callback();
//     }, 1000);
// }

// function onComplete() {
//     console.log("Tarefa após a operação assíncrona.");
// }

// // doSomethingAsync(onComplete);

// // callback hell

// function greet(callback) {
//     setTimeout(function() {
//         console.log("Olá!");
//         callback();
//     }, 1000);
// }

// function introduce(callback) {
//     setTimeout(function() {
//         console.log("Eu sou seu orientador acadêmico.");
//         callback();
//     }, 1000);
// }

// function question(callback) {
//     setTimeout(function() {
//         console.log("Enfrentando algum desafio acadêmico?");
//         callback();
//     }, 1000);
// }

// // Aninhamento de callbacks
// // greet(function() {
// //     introduce(function() {
// //         question(function() {
// //             console.log("Concluído!");
// //         });
// //     });
// // });

// // callback com promises e async/await

// async function showAvatar() {
//     // Lê nosso JSON
//     let response = await fetch('/article/promise-chaining/user.json');
//     let user = await response.json();

//     // Lê o usuário do GitHub
//     let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
//     let githubUser = await githubResponse.json();

//     // Exibe o avatar
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     // Espera 3 segundos
//     await new Promise((resolve) => setTimeout(resolve, 3000));
// }

// showAvatar();

// syncronous
[1,2,3,4].forEach(item => console.log("Processing synchronously" + item));

// asyncronous
function asyncForEach(array, callback) {
    array.forEach(function () {
        setTimeout(callback, 0);
    });
}

asyncForEach([1, 2, 3, 4], function (i) {
    console.log("Processing asynchronously" + i);
});