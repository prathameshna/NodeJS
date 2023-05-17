const fs = require('fs');

// fs.readFile('file.txt', 'utf8', (err, data) => {
//     console.log(err, data);
// });

// const syncFile = fs.readFileSync('file.txt');
// console.log(syncFile.toString());

// fs.writeFile('file2.txt', 'This is a data', () => {
//     console.log('Written to the file');
// });

const writeSyncFile = fs.writeFileSync('file2.txt', 'This is a data');
console.log(writeSyncFile);

console.log('Finished reading file.');