export default () => {
  if (!process.env.SESSION_ID) {
    console.error("`SESSION_ID` environment variable is not defined");
    process.exit(1);
  }
  if (!process.env.DOMAIN_ID) {
    console.error("`DOMAIN_ID` environment variable is not defined");
    process.exit(1);
  }
  if (!process.env.LETSDANE_HOST) {
    console.error("`LETSDANE_HOST` environment variable is not defined");
    process.exit(1);
  }
  if (!process.env.LETSDANE_PORT) {
    console.error("`LETSDANE_PORT` environment variable is not defined");
    process.exit(1);
  }

  if (!process.env.NODE_EXTRA_CA_CERTS) {
    console.warn(
      "Warning: `NODE_EXTRA_CA_CERTS` environment variable is not defined. This may cause DANE validation to fail"
    );
  }

  process.env.COMMAND_PREFIX = process.env.COMMAND_PREFIX || "&";
};
