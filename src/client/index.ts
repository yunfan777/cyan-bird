import Connection from "./connection";

/**
 * 默认保持心跳，更新状态
 *
 * conn对象
 * 订阅者模式： 监听指定事件，执行任务
 * router模式： 回复给指定的终端
 *
 */

type Config = {
  host: string;
};
type ConnState = 0 | 1 | 2 | 3;
export default class Client {
  config: Config;
  #connState: ConnState;

  constructor(config: Config) {
    this.config = config;
    this.#connState = 0;
  }

  conn() {
    const host = this.config.host;
    const conn = new Connection({
      host: host,
    });
    this.#connState = 0;
    conn.on("event-name", (command) => {});
  }
  onclose() {}
  onerror() {}
  onmessage() {}
}
