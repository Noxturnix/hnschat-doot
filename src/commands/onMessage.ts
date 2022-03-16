import { HnsChatMessageData } from "../interfaces/hnsChatMessageData";
import { sedMessageLog } from "../libs/hnsChat";

export default (messageData: HnsChatMessageData) => {
  if (messageData.user !== process.env.DOMAIN_ID) {
    if (!sedMessageLog[messageData.conversation]) sedMessageLog[messageData.conversation] = [];
    sedMessageLog[messageData.conversation].unshift(messageData.message);
    sedMessageLog[messageData.conversation].splice(20);
  }
};
