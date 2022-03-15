import { hnschatWs } from "..";
import type { Event } from "ws";

export default (event: Event) => {
  hnschatWs.send("IDENTIFY " + process.env.SESSION_ID);
};
