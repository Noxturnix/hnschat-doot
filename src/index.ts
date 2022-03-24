import loadEnv from "./libs/loadEnv";
import { client as WebSocketClient } from "websocket";
import type { connection } from "websocket";
import onClose from "./events/onClose";
import onOpen from "./events/onOpen";
import onMessage from "./events/onMessage";

loadEnv();

console.log("Starting Doot...");

const hnsChatWebSocketUri = "wss://ws.hns.chat";

export const hnschatWs = new WebSocketClient();
export let hnsChatWebSocketConnection: connection;

hnschatWs.on("connectFailed", (error) => {
  console.log("Connection failed: " + error.toString());
});

hnschatWs.on("connect", (conn) => {
  hnsChatWebSocketConnection = conn;

  conn.on("error", (error) => {
    console.log("Connection error: " + error.toString());
  });

  conn.on("close", (reasonCode, description) => {
    console.log("Connection closed: ", reasonCode, description);
  });

  conn.on("message", (message) => {
    if (message.type === "utf8") {
      onMessage(message.utf8Data);
    }
  });

  onOpen(conn);
});

hnschatWs.connect(hnsChatWebSocketUri);

// hnschatWs.onclose = onClose;
// hnschatWs.onopen = onOpen;
// hnschatWs.onmessage = onMessage;
