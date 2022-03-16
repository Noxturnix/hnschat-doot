import type { Event } from "ws";

export default (event: Event) => {
  console.error("HNSChat WebSocket connection closed");
  process.exit(1);
};
