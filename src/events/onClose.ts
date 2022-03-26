export default (reasonCode: number, description: string) => {
  console.log("Connection closed:", reasonCode, description);
  process.exit(1);
};
