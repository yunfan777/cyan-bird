const zmq = require("zeromq")










const IDENTITY = "二号"



async function run() {
    const sock = new zmq.Router({
        routingId: IDENTITY
    });
    await sock.connect("tcp://127.0.0.1:7773");
    console.log("router connect to port 7773");
    async function receive() {
        const [msg] = await sock.receive();
        
        const[ origin, empty, receiver, message ] = msg;
        console.log('来信的:', msg);
        console.log('target:', receiver);
        console.log('message:', message.toString())
        // await sock.send([origin, empty, receiver, message]);

        receive();
    }
    receive();
}

run()