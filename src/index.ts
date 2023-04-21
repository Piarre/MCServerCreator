import yargs from "yargs";
import { MessageType } from "./utils/returnMessageHandler";
import Message from "./utils/returnMessageHandler";
import { yargsOptions } from "./constants/yArgs";
import Utilities from "./utils/serverUtilities";
import { versions } from "./constants/minecraft";

(async () => {
  const startArgs = yargs.options(yargsOptions).argv;

  const { mcversion, spigot, folderName } = startArgs as any;

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
