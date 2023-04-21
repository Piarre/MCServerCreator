import { cpSync, existsSync, mkdir, readdir, unlink } from "fs-extra";
import Message from "./returnMessageHandler";
import { join, resolve } from "path";
import { chdir } from "process";
import { MessageType } from "./returnMessageHandler";

export default class Utilities {
  async getJar(URL: string) {
    const execa = await require("execa");
    await execa("curl", ["-k", URL, "-o", "server.jar"], {
      cwd: process.cwd(),
    });
  }

  async createServer(
    folderName: string,
    serverVersion: string | number,
    serverType: string,
    callback: () => {}
  ) {
    if (!existsSync(`${process.cwd()}/${folderName}`)) {
      Message(
        `Creating ${serverVersion} ${serverType} server in ${folderName}...`,
        MessageType.PROCESSING
      );
      await mkdir(`./${folderName}`, () => {
        cpSync(
          `${resolve(__dirname)}/../template/`,
          `${process.cwd()}/${folderName}`,
          {
            recursive: true,
          }
        );
        chdir(`./${folderName}`);
        callback();
      });
      Message(
        `Server ${serverVersion} ${serverType} created into ${folderName}.`,
        MessageType.SUCCESS
      );
    } else {
      Message("A folder with the same name already exists.", MessageType.ERROR);
    }
  }

  // deleteServer() {
  //   Message("Server deleting...", MessageType.PROCESSING);
  //   readdir(process.cwd(), (err, files) => {
  //     if (err) throw err;

  //     for (const file of files) {
  //       unlink(join(process.cwd(), file), (err) => {
  //         if (err) throw err;
  //       });
  //     }
  //   });
  //   Message("Server deleted.", MessageType.SUCCESS);
  // }
}
