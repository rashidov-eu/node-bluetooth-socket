declare module 'bluetooth-socket' {
    import { Duplex, DuplexOptions } from 'stream';
    class BluetoothSocket extends Duplex {
        constructor(fd: number, options?: DuplexOptions);
        static accept(options: DuplexOptions, cb): BluetoothSocket;
        static accept(cb): BluetoothSocket;
    }
    export = BluetoothSocket;
}