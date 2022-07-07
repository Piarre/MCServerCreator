import { cpSync, mkdir } from "fs-extra";

/**
 * @class
 * @author Piarre
 * @version 1.0.0
 * @description Utilities class for tools.
 */
export default class Utilities {
  /**
   * @async
   * @param {string} URL
   * @description Get jar file from mojang's server.
   */
  async getJar(URL) {
    const execa = await require("execa");
    await execa("curl", ["-k", URL, "-o server.jar"], { cwd: process.cwd() });
  }

  /**
   * @async
   * @param {*} callback
   * @description Create a server folder and copy the server.jar into it.
   */
  async getServerTemplate(callback) {
    await mkdir("./server", () => {
      cpSync("src/template", `${process.cwd()}/server`, { recursive: true });
      process.chdir("./server");
      callback();
    });
  }
}
