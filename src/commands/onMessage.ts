import { HnsChatMessageData } from "../interfaces/hnsChatMessageData";
import { sedMessage } from "../libs/hnsChat";

export default (messageData: HnsChatMessageData) => {
  if (
    !messageData.message.trim().toLowerCase().startsWith("s/") &&
    messageData.user !== process.env.DOMAIN_ID
  ) {
    sedMessage.set(messageData.conversation, messageData.message);
  }
};
