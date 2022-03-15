import axios from "axios";
import { HnsChatGetDomainsResponse } from "../interfaces/hnsChatGetDomains";

export default async (sessionId: string, domainId: string): Promise<string> => {
  let hnsChatDomains = await axios.post<HnsChatGetDomainsResponse>("https://hns.chat/api", {
    action: "getDomains",
    key: sessionId
  });

  if (hnsChatDomains.status != 200 || !hnsChatDomains.data.success)
    throw new Error("Failed to get HNSChat domains");

  return hnsChatDomains.data.domains[domainId].domain;
};
