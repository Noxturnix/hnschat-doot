// Thanks @Eskimo for this script
export default (str: string): string => {
  return str.replace(/[.*+\'\`\-\_?^$\{\}\(\)\|\[\\\]\/\#\&\!\+\@\:\~\=]/g, "\\$&");
};
