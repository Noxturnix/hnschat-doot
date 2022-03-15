import { hnschatWs } from "..";

export const sedMessage = new Map();

export const sendMessage = (conversation: string, message: string) => {
  sendCommand("ACTION", {
    action: "sendMessage",
    conversation,
    from: process.env.DOMAIN_ID,
    message
  });
};

export const sendCommand = (command: string, data: object) => {
  hnschatWs.send(command + " " + JSON.stringify(data));
};