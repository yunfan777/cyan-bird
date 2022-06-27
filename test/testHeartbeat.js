const zmq = require("zeromq");

const host = "192.168.0.106";
// const host = "127.0.0.1";
const port = 7770;
async function run() {
  const sock = new zmq.Request();
  const address = `tcp://${host}:${port}`;
  await sock.connect(address);
  console.log(`connect ${address}`);
  async function sendMsg() {
    console.log("--------");
    await sock.send("some work");
    const [msg] = await sock.receive();
    console.log("server: %s", msg.toString());

    setTimeout(() => {
      sendMsg();
    }, 1000);
  }
  sendMsg();
}

run();
