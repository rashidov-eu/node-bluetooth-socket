const stream = require('stream');
const ErrNo = require('errno');
const { isRegExp } = require('util');
const BluetoothFd = require('bindings')('BluetoothFd').BluetoothFd;

ErrNo.errno[-9] = {
    "errno": -9,
    "code": "EBADF",
    "description": "Remote closed the connection",
};
ErrNo.errno[-11] = {
    "errno": -11,
    "code": "EAGAIN",
    "description": "Remote closed the connection",
};

class BluetoothSocket extends stream.Duplex {

    constructor(fd, options) {
        super(options);

        this._impl = new BluetoothFd(fd, this.onRead.bind(this));
    }

    _write(chunk, encoding, callback) {
        if (encoding !== 'buffer')
            chunk = Buffer.from(chunk, encoding);
        const ret = this._impl.write(chunk);

        let err = null;
        if (ret !== 0) {
            if (typeof ret === "number") {
                // if its a number its an libuv error code
                const errDesc = ErrNo.errno[ret] || {};
                const err = new Error(errDesc.description || "Code " + ret);
                err.name = "SystemError";
                err.syscall = "write";
                err.errno = ret;
                err.code = errDesc.code;
            } else {
                err = ret;
            }
        }
        callback(err);
    }

    _read(size) {
        this._impl.start();
    }

    onRead(err, buf) {
        if (err) {
            if (typeof err === 'number') {
                // if its a number its an libuv error code
                const errno = err;
                const errDesc = ErrNo.errno[errno] || {};
                err = new Error(errDesc.description || "Code " + errno);
                err.name = "SystemError";
                err.syscall = "read";
                err.errno = errno;
                err.code = errDesc.code;
            }
            this.destroy(err);
            return;
        }
        if (!this.push(buf)) {
            this._impl.stop();
        }
    }

    _destroy(err, cb) {
        return this._close((er) => cb(er || err));
    }

    _final(cb) {
        return this._close(cb);
    }

    _close(cb) {
        try {
            this._impl.close();
        } catch (e) {
            return cb && cb(e);
        }
        cb && cb();
    }

    bind(port) {
        this._impl.bind(port);
    }

    listen(qLength = 1) {
        if (typeof qLength !== 'number' || qLength <= 0)
            throw TypeError("qlLength must be a positive number");

        this._impl.listen(qLength);
    }

    close() {
        this.destroy();
    }

    accept(options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = undefined;
        }

        let nonblocking = true;
        
        if(options && options.nonblocking){
            nonblocking = options.nonblocking;
        }

        this._impl.accept(nonblocking, (err, fd) => {
            if (err) {
                if (typeof err === 'number') {
                    // if its a number its an libuv error code
                    const errno = err;
                    const errDesc = ErrNo.errno[errno] || {};
                    err = new Error(errDesc.description || "Code " + errno);
                    err.name = "SystemError";
                    err.syscall = "accept";
                    err.errno = errno;
                    err.code = errDesc.code;
                }
                cb(err, undefined);
            } else {
                cb(undefined, new BluetoothSocket(fd, options));
            }
        });
    }
}

module.exports = BluetoothSocket;