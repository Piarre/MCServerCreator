import { cpSync, existsSync, mkdir, readdir, unlink } from "fs-extra";
import returnMessageHandler from "./returnMessageHandler";
import { join, resolve } from 'path';
import { chdir } from "process";

/**
 * @class
 * @author Piarre
 * @version 1.0.3
 * @description Utilities class for tools.
 */
export default class Utilities {
  async getJar(URL) {
    const execa = await require("execa");
    await execa("curl", ["-k", URL, "-o", "server.jar"], { cwd: process.cwd() });
  }

  /**
   * @method
   * @public
   * @returns
   * @author Piarre
   * @param {string} folderName Name of the server folder.
   * @param {string} mcversion Minecraft server version.
   * @param {string} type Type of the server.
   */
  async createServer(folderName, serverVersion, serverType, callback) {
    const msgHandler = new returnMessageHandler();
    if (!existsSync(`${process.cwd()}/${folderName}`)) {
      console.log(msgHandler.Message(`Creating ${serverVersion} ${serverType} server in ${folderName}...`, "PROCESSING"));
      await mkdir(`./${folderName}`, () => {
        cpSync(`${resolve(__dirname)}/../template`, `${process.cwd()}/${folderName}`, {
          recursive: true,
        });
        chdir(`./${folderName}`);
        callback();
      });
      console.log(msgHandler.Message(`Server ${serverVersion} ${serverType} created into ${folderName}.`, "SUCCESS"));
    } else {
      return console.log(msgHandler.Message(
        "A folder with the same name already exists.",
        "ERROR"
      ));
    }
  }

  /**
   * @method
   * @public
   * @returns
   * @author Piarre
   * @description Delete the server folder.
   */
  deleteServer() {
    const msgHandler = new returnMessageHandler();
    console.log(msgHandler.Message("Server deleting...", "PROCESSING"));
    readdir(process.cwd(), (err, files) => {
      if (err) throw err;

      for (const file of files) {
        unlink(join(process.cwd(), file), (err) => {
          if (err) throw err;
        });
      }
    });
    console.log(msgHandler.Message("Server deleted.", "SUCCESS"));
  }
}
