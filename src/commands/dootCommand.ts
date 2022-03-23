import { DootCommand } from "../interfaces/dootCommand";
import { sedMessageLog, sendMessage } from "../libs/hnsChat";
import { sed } from "sed-lite";
import escapeRegex from "../libs/escapeRegex";

const dootCommands: DootCommand[] = [
  {
    command: ["doot"],
    fn: (messageData, _args) => {
      sendMessage(messageData.conversation, "doot");
    }
  },
  {
    command: ["s/"],
    usePrefix: false,
    fn: (messageData, _args) => {
      if (!sedMessageLog[messageData.conversation]) {
        return;
      }

      let sedMessageArr = messageData.message.split(/(?<!\\)\//g);

      if (sedMessageArr.length < 3) {
        return;
      }

      let sedRegex = sedMessageArr[1];
      let sedReplace = sedMessageArr[2];
      let sedFlags = sedMessageArr.length >= 4 ? sedMessageArr[3].split(" ")[0] : "";
      let s: (str: string) => string;
      try {
        s = sed(`s/${sedRegex}/${escapeRegex(sedReplace)}/${sedFlags}`);
      } catch (error) {
        return;
      }

      for (let i = 0; i < sedMessageLog[messageData.conversation].length; i++) {
        let sedMsg = sedMessageLog[messageData.conversation][i];
        let replacedMessage = s(sedMsg);

        if (replacedMessage !== sedMsg) {
          sendMessage(messageData.conversation, "sed: " + replacedMessage);
          break;
        }
      }
    }
  }
];

export default dootCommands;
