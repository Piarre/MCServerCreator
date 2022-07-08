import { access, cpSync, mkdir } from "fs-extra";
import returnMessageHandler from "./returnMessageHandler";

/**
 * @class
 * @author Piarre
 * @version 1.0.0
 * @description Utilities class for tools.
 */
export default class Utilities {
  async getJar(URL) {
    const execa = await require("execa");
    await execa("curl", ["-k", URL, "-o server.jar"], { cwd: process.cwd() });
  }

  async createServer(folderName, callback) {
    const msgHandler = new returnMessageHandler();
    if (access(`${process.cwd()}/${folderName}`))
      return msgHandler.Message(
        "A folder with the same name already exists.",
        "ERROR"
      );
    await mkdir(`./${folderName}`, () => {
      cpSync("src/template", `${process.cwd()}/${folderName}`, {
        recursive: true,
      });
      process.chdir(`./${folderName}`);
      callback();
    });
  }
}
