import type { MessageEvent } from "ws";
import { HnsChatMessageData } from "../interfaces/hnsChatMessageData";
import dootCommands from "../commands/dootCommand";
import onMessage from "../commands/onMessage";

export default (event: MessageEvent) => {
  let [command, ...splitedData] = event.data.toString().split(" ");
  let data = splitedData.join(" ").replace(/&amp;/g, "&");

  console.log("command:", command);
  console.log("data:", data);

  switch (command) {
    case "MESSAGE":
      let messageData: HnsChatMessageData = JSON.parse(data);
      let trimmedMessage = messageData.message.trim();

      onMessage(messageData);

      dootCommandLoop: for (let i = 0; i < dootCommands.length; i++) {
        let dootCommand = dootCommands[i];

        console.log("dootCommand:", dootCommand);

        for (let j = 0; j < dootCommand.command.length; j++) {
          let trimmedcheckingCommand = dootCommand.command[j].trim();
          let checkingCommand =
            (dootCommand.usePrefix === false ? "" : process.env.COMMAND_PREFIX) +
            (dootCommand.ignoreCase === false
              ? trimmedcheckingCommand
              : trimmedcheckingCommand.toLowerCase());
          let checkingMessage =
            dootCommand.ignoreCase === false ? trimmedMessage : trimmedMessage.toLowerCase();

          console.log("checkingCommand:", checkingCommand);
          console.log("checkingMessage:", checkingMessage);

          if (checkingCommand === checkingMessage || checkingMessage.startsWith(checkingCommand)) {
            let commandArgs = trimmedMessage
              .substring(checkingCommand.length)
              .trimStart()
              .split(" ")
              .filter((arg) => arg);

            dootCommand.fn(messageData, commandArgs);

            break dootCommandLoop;
          }
        }
      }

      break;
  }
};