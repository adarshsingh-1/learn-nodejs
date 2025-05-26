const { log } = require('console');
const fs = require('fs');
const os = require('os');


//synchronous file write (Blocking request)
// fs.writeFileSync('./test.txt', "Hello, World!");



//asynchronous file write (Non-blocking request)
// fs.writeFile('./test2.txt', "Hello, World Async!",(err) => {});

// const result = fs.readFileSync('./contacts.txt','utf-8')
// log(result);

//asyn return nhe krta
// fs.readFile('./contacts.txt','utf-8', (err, result) => {
//     if (err) {
//         log('Error reading file:', err);
//         return;
//     }
//     console.log(result); 
// })


// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

// fs.appendFileSync("./test.txt", `Hey There\n`)

// fs.cpSync('./test.txt','./copy.txt')

// fs.unlinkSync('./copy.txt')


// console.log(fs.statSync('./test.txt'));
// fs.mkdirSync('my-docs');

console.log(os.cpus().length);
