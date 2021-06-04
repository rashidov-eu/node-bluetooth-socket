import { Duplex, DuplexOptions } from 'stream';
class BluetoothSocket extends Duplex {
    constructor(fd: number, options?: DuplexOptions);
    bind(port: number): void;
    listen(qlength?: number): void;
    accept(options?: DuplexOptions, cb?: (err, BluetoothSocket) => void): void;
}
export = BluetoothSocket;