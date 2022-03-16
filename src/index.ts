import loadEnv from "./libs/loadEnv";
import WebSocket from "ws";
import onClose from "./events/onClose";
import onOpen from "./events/onOpen";
import onMessage from "./events/onMessage";

loadEnv();

console.log("Starting Doot...");

const hnsChatWebSocketUri = "wss://ws.hns.chat";

export const hnschatWs = new WebSocket(hnsChatWebSocketUri);

hnschatWs.onclose = onClose;
hnschatWs.onopen = onOpen;
hnschatWs.onmessage = onMessage;
