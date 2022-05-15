const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Request
  await sock.connect("tcp://127.0.0.1:7770")
  console.log("Producer bound to port 7770")
  async function sendMsg() {
    console.log('--------')
    await sock.send("some work");
    const [msg] = await sock.receive();
    console.log("server: %s", msg.toString());

    setTimeout(() => {
      sendMsg()
    }, 1000);
  }
  sendMsg();
}

run()