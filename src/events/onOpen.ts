import type { connection } from "websocket";
import getHnsName from "../libs/getHnsName";

export default (conn: connection) => {
  conn.sendUTF("IDENTIFY " + process.env.SESSION_ID);
  getHnsName(process.env.SESSION_ID as string, process.env.DOMAIN_ID as string).then((hnsName) => {
    console.log(`Identified as ${hnsName}/`);
  });
};
