// @ts-nocheck
import yargs from "yargs";
import fs from "fs-extra";

import Utilities from "./serverUtilities.js";

import { versions } from "./constants/minecraft";

/**
 * @author Piarre
 * @version 1.0.0
 * @description Main function for the tools.
 */
(async () => {
  const startArgs = yargs.options({
    version: {
      type: "string",
      demandOption: true,
      alias: "v",
      description: "Minecraft server version's.",
    },
    type: {
      type: "boolean",
      demandOption: false,
      alias: "s",
      description: "vanilla | spigot",
    },
    delete: {
      type: "boolean",
      demandOption: false,
      alias: "d",
      default: false,
      description: "Delete the server.",
    },
  }).argv;

  const { version, type, sdelete } = startArgs;

  // TODO: Finish function to reset/delete the server.
  // if (sdelete) {
  //   const inquirer = await require("inquirer");

  //   await inquirer
  //     .prompt([
  //       {
  //         type: "confirm",
  //         name: "resetConfirmation",
  //         message: "\x1b[31mAre you sure you want to reset the server ?",
  //         default: false,
  //       },
  //     ])
  //   return;
  // }

  if (!(version in versions))
    console.error("\x1b[31mInvalid Minecraft \x1b[31mversion.");

  if (version in versions && !type) {
    const serverUtils = new Utilities();
    await serverUtils.getServerTemplate(() => {
      serverUtils.getJar(versions[version].vanilla);
    });
  } else if (version in versions && type) {
    if (versions[version].spigot == null) {
      console.log(
        `\x1b[31m${version} \x1b[4mSpigot version\x1b[0m is not supported yet.`
      );
    } else {
      console.log(versions[version].spigot);
      getJar(versions[version].spigot);
    }
  }
})();
