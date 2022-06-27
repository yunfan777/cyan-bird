// import * as IpAddress from "ip-address";


export type PortName = "heartbeat" | "publisher" | "forwarding";
export const Ports = {
  "heartbeat": 7770,
  "publisher": 7777,
  "forwarding": 7773
}


type Protocol = "tcp";
type Ip = string;
type Port = number;
export function createAddress(protocol: Protocol, host: Ip, port: Port) {
  return `${protocol}://${host}:${port}`;
}