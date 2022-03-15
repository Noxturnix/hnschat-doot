import { HnsChatMessageData } from "./hnsChatMessageData";

export interface DootCommand {
  command: string[];
  fn(context: HnsChatMessageData, args: string[]): any;
  usePrefix?: boolean;
  ignoreCase?: boolean;
}
