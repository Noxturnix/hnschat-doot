import type { MessageEvent } from "ws";
import { HnsChatMessageData } from "../interfaces/hnsChatMessageData";
import dootCommands from "../commands/dootCommand";
import onMessage from "../commands/onMessage";

const unentity = (str: string): string => {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};

export default (event: MessageEvent) => {
  let [command, ...splitedData] = event.data.toString().split(" ");
  let data = unentity(unentity(splitedData.join(" ")));

  switch (command) {
    case "MESSAGE":
      let messageData: HnsChatMessageData = JSON.parse(data);
      let trimmedMessage = messageData.message.trim();
      let isCommand = false;

      dootCommandLoop: for (let i = 0; i < dootCommands.length; i++) {
        let dootCommand = dootCommands[i];

        for (let j = 0; j < dootCommand.command.length; j++) {
          let trimmedcheckingCommand = dootCommand.command[j].trim();
          let checkingCommand =
            (dootCommand.usePrefix === false ? "" : process.env.COMMAND_PREFIX) +
            (dootCommand.ignoreCase === false
              ? trimmedcheckingCommand
              : trimmedcheckingCommand.toLowerCase());
          let checkingMessage =
            dootCommand.ignoreCase === false ? trimmedMessage : trimmedMessage.toLowerCase();

          if (checkingCommand === checkingMessage || checkingMessage.startsWith(checkingCommand)) {
            let commandArgs = trimmedMessage
              .substring(checkingCommand.length)
              .trimStart()
              .split(" ")
              .filter((arg) => arg);

            isCommand = true;

            try {
              dootCommand.fn(messageData, commandArgs);
            } catch (error) {
              console.error(error);
            }

            break dootCommandLoop;
          }
        }
      }

      if (!isCommand) {
        onMessage(messageData);
      }

      break;
  }
};
