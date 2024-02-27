console.log("hello world");

/*

const os = require("node:os");
console.log(os.userInfo());  //gets info of the browser

console.log(os.uptime());
console.log(_.capitalize("hello"));
console.log(_.camelCase("hello"));


*/

/*
const server = http.createServer((req, res) => {

});

server.listen(port, "127.0.0.1",  () => {

    console.log(`server is listening at ${port}`);
});
*/

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Dne')
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})


server.listen(port , () => {
    console.log()
})