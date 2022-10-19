/**
 * @class
 * @public
 * @author Piarre
 *
 */
export default class returnMessageHandler {
  /**
   * @method
   * @author Piarre
   * @param {string} message Message to display.
   * @param {string} color Color of the message.
   * @param {string} type Type of the message.
   * @public
   * @returns
   */

  Message(message, type) {
    if (!(type == "ERROR" || "SUCCESS" || "WARNING" || "PROCESSING"))
      return new TypeError(
        "Only ERROR, SUCCES, WARNING and PROCESSING types are allowed."
      );
    switch (type) {
      case "ERROR":
        return console.log(`\x1b[41mERROR\x1b[0m ${message}`);
      case "SUCCESS":
        return console.log(`\x1b[42mSUCCESS\x1b[0m ${message}`);
      case "WARNING":
        return console.log(`\x1b[43mWARNING\x1b[0m ${message}`);
      case "PROCESSING":
        return console.log(`\x1b[44mPROCESSING\x1b[0m ${message}`);
      default:
        break;
    }
  }
}
