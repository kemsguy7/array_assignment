console.log(console);
//import fs from 'node:fs';

//creating a simple node server 
const http = require('http'); 

const server = http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
}); 
 
server.listen(3000);

console.log(process.env.NODE_ENV);

const note = process.argv[2]
const newNote = {
    content: note,
    id: Date.now()
}
console.log(newNote);

