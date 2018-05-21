'user strict';
let buf = new Buffer('this is my pretty example');
let json = JSON.stringify(buf);
let buf2 = new Buffer(JSON.parse(json).data);

console.log(buf);
console.log(json);
console.log(buf2);
console.log(buf2.toString());
