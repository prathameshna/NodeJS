const path = require('path');

console.log(path.basename('C:\\temp\\myfile.html'));
console.log(path.win32.basename('C:\\temp\\myfile.html'));
console.log(path.posix.basename('/tmp/myfile.html'));
console.log(path.dirname('C:\\temp\\myfile.html'));
console.log(path.extname(__filename));

