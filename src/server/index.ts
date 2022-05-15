import * as zeromq from 'zeromq';
import { SocketType } from 'zeromq/lib/native';

export interface Host {
    host: string,
    port: number,
    protocol: string,
}
// type ServerHost<T> = {
//     [P in keyof T]: T[P] | undefined
// }
// export interface ServerProps extends ServerHost<Host> {
    
// }

type Callback = (args: {
    origin: string,
    message: string,
    target?: string
}) => void



/**
 * 绑定
 * 发送
 * 接收
 */

/**
 * Server
 * 
 * 心跳接口
 * 消息接口
 * 获取工作机列表
 * 获取任务列表
 */
class Server {
    public host: Host;
    public address: string;
    public callback: Callback;

    constructor(props: Host) {
        this.host = {
            host: props.host,
            port: props.port,
            protocol: props.protocol
        };
        this.address = this.getAddress(this.host)
        this.callback = () => {};
    }

    getAddress({protocol, host, port}: Host) {
        return `${protocol}://${host}:${port}`;
    }

    getNewZmq(type: keyof typeof SocketType) {
        switch(type) {
            default:
            case "Reply":
                return new zeromq.Reply;
            case "Pull":
                return new zeromq.Pull;
            case "Request":
                return new zeromq.Request;
            case "Router":
                return new zeromq.Router;
            case "Publisher":
                return new zeromq.Publisher;
        }
    }

    on(callback: Callback) {
        this.callback = callback;
    }
}

export class Heartbeat extends Server {
    sock: zeromq.Reply

    constructor(props: any) {
        super(props);
        this.sock = this.getNewZmq("Reply") as zeromq.Reply;
        this.callback = () => {};
    }

    async run() {
        const self = this;
        const sock = self.sock;
        const { protocol, host, port } = self.host;
        const address = `${protocol}://${host}:${port}`;
        await sock.bind(address);
        console.log('heartbeat:  ' + address);
        for await (const [msg] of sock) {
            self.callback({
                origin: '127.0.0.1',
                message: msg.toString()
            });
            await sock.send("World123");
        }
    }
}

export class Router extends Server {
    sock: zeromq.Router

    constructor(props: any) {
        super(props);
        this.sock = this.getNewZmq("Router") as zeromq.Router;
    }
    
    async run() {
        const self = this;
        const sock = self.sock;
        const { protocol, host, port } = self.host;
        const address = `${protocol}://${host}:${port}`;
        await sock.bind(address);
        console.log('router:  ' + address);
        
        async function receive() {
            const msg = await sock.receive();
            console.log('转发', msg.toString());
            const [ origin, empty, receiver, message ] = msg;
            // await sock.send([origin, empty, receiver, message]);
            await sock.send([receiver, empty, origin, message]);

            receive();
        }
        receive();
    }
}


export class Publisher extends Server {
    sock: zeromq.Publisher

    constructor(props: any) {
        super(props);
        this.sock = this.getNewZmq("Publisher") as zeromq.Publisher;
    }

    async run() {
        const self = this;
        const sock = this.sock;
        await sock.bind(self.address);
    }

    async send() {
        const sock = this.sock;
        await sock.send(["kitty cats", "meow!"]);
    }
}


export default {};