import { Duplex, DuplexOptions } from 'stream';
declare class BluetoothSocket extends Duplex {
    constructor(fd: number, options?: DuplexOptions);
    bind(port: number): void;
    listen(qlength?: number): void;
    accept(cb?: (err: any, sock: BluetoothSocket) => void): void;
    accept(options?: DuplexOptions & { nonBlocking?:boolean }, cb?: (err: any, sock: BluetoothSocket) => void): void;
    close(): void;
}
export = BluetoothSocket;