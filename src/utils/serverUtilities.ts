import { cpSync, existsSync, mkdir, readdir, unlink } from "fs-extra";
import { Message } from "./returnMessageHandler";
import { join, resolve } from 'path';
import { chdir } from "process";
import { MessageType } from "./returnMessageHandler";

export default class Utilities {
  async getJar(URL: string) {
    const execa = await require("execa");
    await execa("curl", ["-k", URL, "-o", "server.jar"], { cwd: process.cwd() });
  }


  async createServer(folderName: string, serverVersion: string | number, serverType: string, callback: () => {}) {
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

  deleteServer() {
    
    Message("Server deleting...", MessageType.PROCESSING)
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
