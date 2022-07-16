import Connection from "./connection";

const host = "192.168.0.101";

/**
 * 默认保持心跳，更新状态
 *
 * conn对象
 * 订阅者模式： 监听指定事件，执行任务
 * router模式： 回复给指定的终端
 *
 */

function main() {
  const conn = new Connection({
    host: host,
  });
  conn.on("event-name", (command) => {});
}
main();
