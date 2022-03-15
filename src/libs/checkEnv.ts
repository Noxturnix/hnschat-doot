export default () => {
  if (!process.env.SESSION_ID) {
    console.error("`SESSION_ID` environment variable is not defined");
    process.exit(1);
  }
  if (!process.env.DOMAIN_ID) {
    console.error("`DOMAIN_ID` environment variable is not defined");
    process.exit(1);
  }

  process.env.COMMAND_PREFIX = process.env.COMMAND_PREFIX || "&";
};
