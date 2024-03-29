export const yargsOptions: any = {
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
  folderName: {
    type: "string",
    demandOption: false,
    alias: "f",
    description: "The name of the server folder.",
    default: "server",
  },
};
