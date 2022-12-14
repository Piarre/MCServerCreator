
export const enum MessageType {
  ERROR,
  SUCCESS,
  WARNING,
  PROCESSING
}

export default class returnMessageHandler {
  Message(message: string, type: MessageType) {
    if (!(type in MessageType))
      return new TypeError("Only ERROR, SUCCES, WARNING and PROCESSING types are allowed.");
    switch (type) {
      case MessageType.ERROR:
        return `\x1b[41mERROR\x1b[0m ${message}`;
      case MessageType.SUCCESS:
        return `\x1b[42mSUCCESS\x1b[0m ${message}`;
      case MessageType.WARNING:
        return `\x1b[43mWARNING\x1b[0m ${message}`;
        case MessageType.PROCESSING:
        return `\x1b[44mPROCESSING\x1b[0m ${message}`;
      default:
        break;
    }
  }
}
