var fs = require('fs');

function home() {
    console.log('Request home called.');
    return fs.readFileSync('views/home.html');
}

function show() {
    console.log('Request show called.');
}

function upload() {
    console.log('Request upload called.');
}

exports.home = home;
exports.show = show;
exports.upload = upload;
