declare module 'bluetooth-socket' {
    import { Duplex, DuplexOptions } from 'stream';
    class BluetoothSocket extends Duplex {
        constructor(fd: number, options?: DuplexOptions);
        bind(port: number);
        listen(qlength: number = 1);
        accept(options?: DuplexOptions, cb: (err, BluetoothSocket) => void);
    }
    export = BluetoothSocket;
}