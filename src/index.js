// @ts-nocheck

// Modules
import yargs from "yargs";
import path from "path";
import fs from "fs";

// Classes
import Utilities from "./utils/serverUtilities.js";
import returnMessageHandler from './utils/returnMessageHandler';

// Constants
import { versions } from "./constants/minecraft";

/**
 * @author Piarre
 * @version 1.0.0
 * @description Main function for the tools.
 */
(async () => {
  const startArgs = yargs.options({
    mcversion: {
      type: "string",
      demandOption: false,
      alias: "v",
      description: "Minecraft server version's.",
    },
    spigot: {
      type: "boolean",
      demandOption: false,
      alias: "s",
      description: "If you want to use spigot server.",
    },
    sdelete: {
      type: "boolean",
      demandOption: false,
      alias: "d",
      description: "Delete the server.",
    },
    folderName: {
      type: "string",
      demandOption: false,
      alias: "f",
      description: "The name of the server folder.",
      default: "server",
    },
  }).argv;

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
          msgHandler.Message("Server deleting...", "WARNING", "RED");
          fs.readdir(process.cwd(), (err, files) => {
            if (err) throw err;

            for (const file of files) {
              fs.unlink(path.join(process.cwd(), file), (err) => {
                if (err) throw err;
              });
            }
          });
          msgHandler.Message("Server deleted.", "SUCCESS", "RED");
        }
      });

    return;
  }

  console.log(msgHandler.Message("Server creating...", "WARNING", "RED"))

  // if (false) {
  //   return;
  // }

  if (!(mcversion in versions))
    return msgHandler.Message("Minecraft version not found.", "ERROR", "RED");

  if (mcversion in versions && !spigot) {
    const serverUtils = new Utilities();
    await serverUtils.createServer(folderName, () => {
      serverUtils.getJar(versions[mcversion].vanilla);
    });
  } else if (mcversion in versions && spigot) {
    if (versions[mcversion].spigot == null) {
      msgHandler.Message(`${mcversion} Spigot version is not supported yet.`, "ERROR", "RED");
    } else {
      const serverUtils = new Utilities();
      await serverUtils.createServer(folderName, () => {
        serverUtils.getJar(versions[mcversion].spigot);
      });
    }
  }
})();
