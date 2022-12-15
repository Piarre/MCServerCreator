import yargs from "yargs";

import Utilities from "./utils/serverUtilities.js";
import { MessageType } from "./utils/returnMessageHandler";

import Message from "./utils/returnMessageHandler";
import { versions } from "./constants/minecraft.js";
import { yargsOptions } from "./constants/yArgs.js";

(async () => {
  const startArgs = yargs.options(yargsOptions).argv;

  const { mcversion, spigot, sdelete, folderName } = startArgs as any;

  if (sdelete) {
    const inquirer = await require("inquirer");

    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "deleteConfirm",
          message: "\x1b[31mAre you sure you want to reset the server ?",
          default: false,
        },
      ])
      .then((answer: any) => {
        if (answer.deleteConfirm) {
          new Utilities().deleteServer();
        }
      });

    return;
  }

  if (!mcversion) {
    yargs.options(yargsOptions).demandCommand().argv;
    return Message("Please specify a Minecraft version.", MessageType.ERROR);
  }

  if (!(mcversion in versions))
    return Message("Minecraft version not found.", MessageType.ERROR);

  if (mcversion in versions && !spigot) {
    const serverUtils = new Utilities();
    await serverUtils.createServer(folderName, mcversion, "Vanilla", () =>
      serverUtils.getJar(versions[mcversion].vanilla)
    );
  } else if (mcversion in versions && spigot) {
    if (versions[mcversion].spigot == null) {
      Message(
        `${mcversion} Spigot version is not supported yet.`,
        MessageType.ERROR
      );
    } else {
      const serverUtils = new Utilities();
      await serverUtils.createServer(folderName, mcversion, "Spigot", () =>
        serverUtils.getJar(versions[mcversion].spigot)
      );
    }
  }
})();
