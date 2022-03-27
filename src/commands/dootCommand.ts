import { DootCommand } from "../interfaces/dootCommand";
import { sedMessageLog, sendMessage } from "../libs/hnsChat";
import { sed } from "sed-lite";
import escapeRegex from "../libs/escapeRegex";
import axios from "axios";
import { httpsOverHttp } from "tunnel";

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
  },
  {
    command: ["wallet"],
    fn: async (messageData, args) => {
      let sendUsages = () => {
        sendMessage(messageData.conversation, "Usage: wallet <symbol> <name>");
      };

      if (args.length !== 2) {
        sendUsages();
        return;
      }

      let [symbol, domain] = args;

      symbol = symbol.trim().toUpperCase();
      domain = domain.trim().toLowerCase();

      while (domain.endsWith("/")) {
        domain = domain.slice(0, -1);
      }

      while (domain.endsWith(".")) {
        domain = domain.slice(0, -1);
      }

      if (!symbol.match(/^[A-Z]*$/)) {
        sendMessage(messageData.conversation, "Invalid symbol", messageData.id);
        return;
      }

      if (domain.includes("/")) {
        sendMessage(messageData.conversation, "Invalid name", messageData.id);
        return;
      }

      try {
        let resp = await axios.get(`https://${domain}:443/.well-known/wallets/${symbol}`, {
          headers: {
            "User-Agent": "hnschat-doot"
          },
          httpsAgent: httpsOverHttp({
            proxy: {
              host: process.env.LETSDANE_HOST as string,
              port: parseInt(process.env.LETSDANE_PORT as string)
            }
          }),
          validateStatus: () => true
        });

        if (resp.status === 200) {
          let addr = (resp.data as string).trim();

          if (
            addr.length > 0 &&
            addr.length <= 100 &&
            !addr.replaceAll("\r\n", "\n").replaceAll("\r", "\n").includes("\n")
          )
            sendMessage(messageData.conversation, addr, messageData.id);
          else sendMessage(messageData.conversation, "ERROR: Invalid address", messageData.id);
        } else {
          sendMessage(messageData.conversation, "No wallet", messageData.id);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "SELF_SIGNED_CERT_IN_CHAIN")
            sendMessage(messageData.conversation, "ERROR: DANE validation failed", messageData.id);
          else if (error.code === "ECONNRESET")
            sendMessage(
              messageData.conversation,
              "ERROR: Cannot make a connection to server",
              messageData.id
            );
          return;
        }
        console.error("Error:", (error as any).message());
        return;
      }
    }
  }
];

export default dootCommands;
