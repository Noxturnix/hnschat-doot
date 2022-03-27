import { hnsChatWebSocketConnection } from "..";
import { HnsChatSedLog } from "../interfaces/hnsChatSedLog";

export const sedMessageLog: HnsChatSedLog = {};

export const sendMessage = (conversation: string, message: string, replying?: string) => {
  sendCommand("ACTION", {
    action: "sendMessage",
    conversation,
    from: process.env.DOMAIN_ID,
    message,
    replying
  });
};

export const sendCommand = (command: string, data: object) => {
  hnsChatWebSocketConnection.sendUTF(command + " " + JSON.stringify(data));
};
