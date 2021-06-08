#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BluetoothSocket = require(".");
const { pipeline } = require('stream');
const split = require('split');
const through = require('through');

function print(writeStream) {
    return through(function write(data) {
        writeStream.write(data + "\r\n");
        this.emit('data', data);
    })
}

function eol() {
    return through(function write(data) {
        this.emit('data', data + "\r\n");
    })
}

class BluetoothController {
    accept(server) {
        setImmediate(() => {
            console.log('-> accept');
            server.accept(undefined, (err, socket) => {
                if (err)
                    return console.log(err);

                console.log('|> socket opened');
                socket.on('error', (err) => { console.error("~~>",err) });
                socket.on('close', () => { 
                    console.log('-> Close')
                    this.accept(server) });
                pipeline(
                    socket,
                    split(),
                    print(process.stdout),
                    eol(),
                    socket,
                    (err) => {
                        console.error("~>",err);
                    }
                );
            });
        });
    }

    listen() {
        console.log('-> init');
        const sock = new BluetoothSocket(0);

        console.log('-> bind');
        sock.bind(22);

        console.log('-> listen');
        sock.listen(1);

        this.accept(sock);
    }
}
const bt = new BluetoothController();
bt.listen();
//# sourceMappingURL=test.js.map