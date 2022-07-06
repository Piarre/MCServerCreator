import { cpSync, mkdir, readFile } from "fs-extra";

export default class Utilities {
  async getJar(url) {
    const execa = await require("execa");
    await execa("curl", ["-k", url, "-o server.jar"], { cwd: process.cwd() });
  }

  async getServerTemplate(callback) {
    await mkdir("./server", () => {
      cpSync("src/template", `${process.cwd()}/server`, { recursive: true });
      process.chdir("./server");
      callback();
    });
  }
}
