import * as zeromq from 'zeromq';
import { Ports, createAddress } from '../utils';




// (((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))
interface ConnectionProps {
  host: string,
}

const heartbeatInterval = 5000;

/**
 * conn对象，保持连接，更新状态
 */
export default class Connection {
  host: ConnectionProps["host"];
  heartbeat: zeromq.Request | undefined;

  constructor(props: ConnectionProps) {
    const self = this;
    this.host = props.host;
    this.initHeartbeat().then(sock => {
      self.heartbeat = sock;
    });
  }

  async initHeartbeat() {
    const protocol = "tcp";
    const address = createAddress(protocol, this.host, Ports["heartbeat"]);
    const sock = new zeromq.Request;
    await sock.connect(address);
    console.log(`heartbeat connect ${address}`);
    async function sendBeat() {
      await sock.send("some work");
      const [msg] = await sock.receive();
      console.log("server: %s", msg.toString());
  
      setTimeout(() => {
        sendBeat();
      }, heartbeatInterval);
    }
    sendBeat();
    return sock;
  }

  


  send() {
    return {};
  }

  on(eventName: string, callback: (command: string) => void) {
    
  }

}