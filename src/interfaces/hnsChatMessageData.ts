export interface HnsChatMessageData {
  id: string;
  time: number;
  conversation: string;
  user: string;
  message: string;
  signed: number;
  signature: string | null;
}
