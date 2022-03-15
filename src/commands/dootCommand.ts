import { DootCommand } from "../interfaces/dootCommand";
import { sedMessage, sendMessage } from "../libs/hnsChat";
import { sed } from "sed-lite";

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
      if (!sedMessage.has(messageData.conversation)) {
        return;
      }

      let s = sed(messageData.message);
      let replacedMessage = s(sedMessage.get(messageData.conversation));

      sendMessage(messageData.conversation, "sed: " + replacedMessage);
    }
  }
];

export default dootCommands;
