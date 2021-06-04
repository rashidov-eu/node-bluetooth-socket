#ifndef ___BLUETOOTH_FD_H___
#define ___BLUETOOTH_FD_H___

#include <nan.h>
#include <node.h>

class BluetoothFd : public Nan::ObjectWrap {
   public:
    static NAN_MODULE_INIT(Init);
    static NAN_METHOD(New);
    static NAN_METHOD(Start);
    static NAN_METHOD(Stop);
    static NAN_METHOD(Write);
    static NAN_METHOD(Close);
    static NAN_METHOD(Bind);
    static NAN_METHOD(Listen);
    static NAN_METHOD(Accept);

   private:
    BluetoothFd(int fd, const v8::Local<v8::Function>& readCallback);
    ~BluetoothFd();

    void start();
    void stop();
    int bind(uint8_t);
    int listen(int qLength);

    int write_(char* data, int length);
    bool close_();

    void poll(int status);
    void accept(const v8::Local<v8::Function>& acceptCallback);
    void do_accept();
    void after_accept(int status);

    void emitErrnoError();

    static void PollCallback(uv_poll_t* handle, int status, int events);
    static void do_acceptCallback(uv_work_t *req);
    static void after_acceptCallback(uv_work_t *req, int status);
   private:
    Nan::Persistent<v8::Object> This;

    int _fd;
    int _client;
    int _lastErrno;
    Nan::Callback _readCallback;
    Nan::Callback _acceptCallback;

    bool isReading;
    uv_poll_t _pollHandle;
    uv_work_t acceptHandle;

    static Nan::Persistent<v8::FunctionTemplate> constructor_template;
};

#endif