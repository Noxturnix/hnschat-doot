export interface HnsChatDomain {
  domain: string;
  locked: boolean;
}

export interface HnsChatDomains {
  [key: string]: HnsChatDomain;
}
