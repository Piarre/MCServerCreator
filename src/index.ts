import yargs from "yargs";
import fs from "fs-extra";

import { versions } from "../constants/minecraft";

const args: any = yargs.options({
  mcversion: {
    type: "string",
    demandOption: true,
    alias: "v",
  },
  type: {
    type: "string",
    demandOption: true,
    alias: "t",
  },
}).argv;

const { mcversion, type } = args;