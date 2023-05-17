//  import fs from 'fs';
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplates');


///////////////////////////////////////
// Files

// Blocking, synchronous way
// const textInput =  fs.readFileSync('./starter/txt/input.txt', 'utf-8');

// console.log(textInput);

// const textOut = `This is what we know about the avocado: ${textInput}. \nCreated on ${Date.now()}`;

// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('File has been written!');

// Non-blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1)=>{
//     if(err) return console.log("ERROR!!");
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3)=>{
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written.');
//             })
//         });
//     });
// });
// console.log('Will read file');


///////////////////////////////////////
// Server

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map(ele => slugify(ele.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
    // console.log(req);
    // console.log(req.url);
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardshtml = dataObject.map(ele => replaceTemplate(tempCard, ele)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml);

        res.end(output);
    }
    // Product page  
    else if (pathname === '/product') {
        // console.log(query);
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    }
    // API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } 
    // Not found 
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page Not Found!</h1>');
    }
    // res.end('Hello from the server!');
})

server.listen(3001, '127.0.0.1', () => {
    console.log('Listening to requests on port 3001');
});


