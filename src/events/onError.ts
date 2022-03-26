export default (error: Error) => {
  console.log("Connection error:", error.toString());
  process.exit(1);
};
