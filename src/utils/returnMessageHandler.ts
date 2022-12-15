export enum MessageType {
  ERROR,
  SUCCESS,
  WARNING,
  PROCESSING,
}

export default function Message(
  message: string,
  type: MessageType
): TypeError | void | undefined {
  if (!(type in MessageType))
    return new TypeError(
      "Only ERROR, SUCCES, WARNING and PROCESSING types are allowed."
    );
  switch (type) {
    case MessageType.ERROR:
      return console.log(`\x1b[41mERROR\x1b[0m ${message}`);
    case MessageType.SUCCESS:
      return console.log(`\x1b[42mSUCCESS\x1b[0m ${message}`);
    case MessageType.WARNING:
      return console.log(`\x1b[43mWARNING\x1b[0m ${message}`);
    case MessageType.PROCESSING:
      return console.log(`\x1b[44mPROCESSING\x1b[0m ${message}`);
    default:
      break;
  }
}
