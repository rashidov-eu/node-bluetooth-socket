import { Duplex, DuplexOptions } from 'stream';
declare class BluetoothSocket extends Duplex {
    constructor(fd: number, options?: DuplexOptions);
    bind(port: number): void;
    listen(qlength?: number): void;
    accept(options?: DuplexOptions, cb?: (err: any, sock: BluetoothSocket) => void): void;
}
export = BluetoothSocket;