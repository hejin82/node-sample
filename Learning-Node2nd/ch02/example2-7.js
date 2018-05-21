'use strict';
var util = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');

function InputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt',
        {'flgs': 'a',
        'encoding': 'utf8',
        'mode': 0o666});
};

util.inherits(InputChecker, eventEmitter);

InputChecker.prototype.check = function check(input) {
    let command = input.trim().substr(0, 3);
    if (command == 'wr:') {
        this.emit('write', input.substr(3, input.length));
    } else if (command == 'en:') {
        this.emit('end');
    } else {
        this.emit(('echo', input));
    }
};

let ic = new InputChecker('shelley', 'output');
ic.on('write', function(data) {
    this.writeStream.write(data, 'utf8');
});
ic.on('echo', function(data) {
    process.stdout.write(ic.name + ' wrote ' + data);
});
ic.on('end', function() {
    process.exit();
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
    let input = process.stdin.read();
    if (input !== null) {
        ic.check(input);
    }
});