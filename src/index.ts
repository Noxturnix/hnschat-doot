import loadEnv from "./libs/loadEnv";
import WebSocket from "ws";
import onOpen from "./events/onOpen";
import onMessage from "./events/onMessage";
import getHnsName from "./libs/getHnsName";

loadEnv();

console.log("Starting Doot...");

export const hnschatWs = new WebSocket("wss://ws.hns.chat");

hnschatWs.onopen = onOpen;
hnschatWs.onmessage = onMessage;

getHnsName(process.env.SESSION_ID as string, process.env.DOMAIN_ID as string).then((hnsName) => {
  console.log(`Identified as ${hnsName}/`);
});
