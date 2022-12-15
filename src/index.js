import yargs from "yargs";

import Utilities from "./utils/serverUtilities.js";
import returnMessageHandler from "./utils/returnMessageHandler";

import { versions } from "./constants/minecraft";
import { yargsOptions } from "./constants/yArgs";

(async () => {
  const startArgs = yargs.options(yargsOptions).argv;

  const { mcversion, spigot, sdelete, folderName } = startArgs;

  const msgHandler = new returnMessageHandler();

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
      .then((answer) => {
        if (answer.deleteConfirm) {
          new Utilities().deleteServer();
        }
      });

    return;
  }

  if (!mcversion) {
    yargs.options(yargsOptions).demandCommand().argv;

    return console.log(
      msgHandler.Message("Please specify a Minecraft version.", "ERROR")
    );
  }

  if (!(mcversion in versions))
    return console.log(
      msgHandler.Message("Minecraft version not found.", "ERROR")
    );

  if (mcversion in versions && !spigot) {
    const serverUtils = new Utilities();
    await serverUtils.createServer(folderName, mcversion, "Vanilla", () => {
      serverUtils.getJar(versions[mcversion].vanilla);
    });
  } else if (mcversion in versions && spigot) {
    if (versions[mcversion].spigot == null) {
      console.log(
        msgHandler.Message(
          `${mcversion} Spigot version is not supported yet.`,
          "ERROR"
        )
      );
    } else {
      const serverUtils = new Utilities();
      await serverUtils.createServer(folderName, mcversion, "Spigot", () => {
        serverUtils.getJar(versions[mcversion].spigot);
      });
    }
  }
})();
