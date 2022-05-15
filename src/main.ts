import { Heartbeat, Router, Publisher } from './server';
import { Message } from './message'




const local = '127.0.0.1';
/**
 * 
 * 端口定义
 * 心跳端口 7770
 * 发布端口 7777
 * 转发端口 7773
 * 
 */

const hosts = {
    "heartbeat": {
        host: local,
        port: 7770
    },
    "publisher": {
        host: local,
        port: 7777
    },
    "forwarding": {
        host: local,
        port: 7773
    }
}


function main() {

    // 心跳
    const heartbeat = new Heartbeat({
        ...hosts["heartbeat"],
        protocol: "tcp"
    });
    heartbeat.run();

    // 消息转发
    const forwarding = new Router({
        ...hosts["forwarding"],
        protocol: "tcp"
    });
    forwarding.on(({origin, target, message}) => {
        console.log(`消息是${message}`);
    });
    forwarding.run();

    // 广播模式
    const publisher = new Publisher({
        ...hosts["publisher"],
        protocol: "tcp"
    });

    // 打洞模式
    
}
main();
