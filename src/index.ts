import loadEnv from "./libs/loadEnv";
import { client as WebSocketClient } from "websocket";
import type { connection } from "websocket";
import onClose from "./events/onClose";
import onOpen from "./events/onOpen";
import onMessage from "./events/onMessage";
import onError from "./events/onError";

loadEnv();

console.log("Starting Doot...");

const hnsChatWebSocketUri = "wss://ws.hns.chat";

export const hnschatWs = new WebSocketClient();
export let hnsChatWebSocketConnection: connection;

hnschatWs.on("connectFailed", (error) => {
  console.log("Connection failed: " + error.toString());
  process.exit(1);
});

hnschatWs.on("connect", (conn) => {
  hnsChatWebSocketConnection = conn;

  conn.on("error", onError);

  conn.on("close", onClose);

  conn.on("message", (message) => {
    if (message.type === "utf8") {
      onMessage(message.utf8Data);
    }
  });

  onOpen(conn);
});

hnschatWs.connect(hnsChatWebSocketUri);
