// @ts-nocheck
import yargs from "yargs";
import fs from "fs-extra";

import Utilities from "./serverUtilities.js";

import { versions } from "./constants/minecraft";

(async () => {
  const startArgs = yargs.options({
    mcversion: {
      type: "string",
      demandOption: false,
      alias: "v",
      description: "Minecraft server version's.",
    },
    serverType: {
      type: "boolean",
      demandOption: false,
      alias: "s",
      description: "vanilla | spigot",
    },
    deleteServer: {
      type: "boolean",
      demandOption: false,
      alias: "d",
      default: false,
      description: "Delete the server.",
    },
  }).argv;

  const { mcversion, serverType, deleteServer } = startArgs;


  // TODO: Create  a function to reset/delete the server.
  // if (deleteServer) {
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
  //     .then((resetConfirmation) => {
  //       if (resetConfirmation) {
  //         console.log("Server resetting...");
  //         process.chdir("..");
  //         fs.remove("./server");
  //       } else {
  //         console.log("\x1b[32mServer resetting canceled.");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return;
  // }

  if (!(mcversion in versions))
    console.log("\x1b[31mInvalid Minecraft \x1b[31mversion.");

  if (mcversion in versions && !serverType) {
    const serverUtils = new Utilities();
    await serverUtils.getServerTemplate(() => {
      serverUtils.getJar(versions[mcversion].vanilla);
      fs.writeFile("version.txt", mcversion);
    });
  } else if (mcversion in versions && serverType) {
    if (versions[mcversion].spigot == null) {
      console.log(
        `\x1b[31m${mcversion} \x1b[4mSpigot version\x1b[0m is not supported yet.`
      );
    } else {
      console.log(versions[mcversion].spigot);
      getJar(versions[mcversion].spigot);
    }
  }
})();
