const zmq = require("zeromq")










const IDENTITY = "一号"



async function run() {
    const sock = new zmq.Request({
        routingId: IDENTITY
    });
    sock.events.on("connect", (data) => {
        console.log('conn事件', data)
    })
    await sock.connect("tcp://127.0.0.1:7773");
    console.log("router connect to port 7773");
    async function sendMsg() {
        await sock.send(["二号", "我发信息来了"]);
        console.log('send ed', sock);
        const [msg] = await sock.receive();
        console.log("server: %s", msg.toString());
        

        // setTimeout(() => {
        //     sendMsg()
        // }, 1000);
    }
    sendMsg();
}

run()