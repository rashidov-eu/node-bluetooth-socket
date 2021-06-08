#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BluetoothSocket = require(".");
class BluetoothController {
    listen() {
        console.log('init');
        const sock = new BluetoothSocket(0);

        console.log('bind');
        sock.bind(22);

        console.log('listen');
        sock.listen(1);

        console.log('accept');
        sock.accept(undefined, (err, socket) => {
            if (err)
                return console.log(err);
            console.log('socket opened =>>');
            socket.pipe(process.stdout);
            socket.on('error', console.error);
        });
    }
}
const bt = new BluetoothController();
bt.listen();
//# sourceMappingURL=test.js.map