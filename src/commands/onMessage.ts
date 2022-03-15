import { HnsChatMessageData } from "../interfaces/hnsChatMessageData";
import { sedMessage } from "../libs/hnsChat";

export default (messageData: HnsChatMessageData) => {
  console.log("user:", messageData.user);
  console.log("DOMAIN_ID:", process.env.DOMAIN_ID);
  if (
    !messageData.message.trim().toLowerCase().startsWith("s/") &&
    messageData.user !== process.env.DOMAIN_ID
  ) {
    sedMessage.set(messageData.conversation, messageData.message);
  }
  console.log("sedMessage:", sedMessage);
};
