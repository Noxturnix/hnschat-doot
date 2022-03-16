import { hnschatWs } from "..";
import type { Event } from "ws";
import getHnsName from "../libs/getHnsName";

export default (event: Event) => {
  hnschatWs.send("IDENTIFY " + process.env.SESSION_ID);
  getHnsName(process.env.SESSION_ID as string, process.env.DOMAIN_ID as string).then((hnsName) => {
    console.log(`Identified as ${hnsName}/`);
  });
};
