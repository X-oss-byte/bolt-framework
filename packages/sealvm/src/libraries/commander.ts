// @ts-ignore
import packageJSON from "../../package.json";

import chalk from "chalk";
import { map } from "lodash";
import * as path from "path";
import { Command } from "commander";
import { readdir } from "fs/promises";
import { closestMatch } from "closest-match";

export default class Commander {
  public cwd: string = process.cwd();
  public program: Command = new Command();

  public static async register() {
    const command = new Commander();

    await command.init();
    await command.addCommands();
    await command.close();
  }

  public async init() {
    this.program
      .name("sealvm")
      .version(`sealvm Run Version v${packageJSON.version}`)
      .description(`sealvm CLI tool v${packageJSON.version}`);
  }

  public async addCommands() {
    const files: string[] = await readdir(
      path.join(__dirname, "..", "commands")
    );

    files.sort((a: string, b: string) => {
      const aNum = parseInt((a.match(/^\d+/) ?? [""])[0]);
      const bNum = parseInt((b.match(/^\d+/) ?? [""])[0]);
      return aNum - bNum;
    });

    for await (const file of files) {
      if (!file.endsWith(".js")) {
        continue;
      }

      const commands = await import("../commands/" + file.replace(".js", ""));

      commands.default(this.program);
    }
  }

  public async close() {
    this.program.on("command:*", () => {
      const cmd: string = this.program.args[0];
      const cmds = map(this.program.commands, "_name").concat("help");
      const closestCommand = closestMatch(cmd, cmds);
      //@ts-ignore
      this.program.args[0] = closestCommand;
      const cmdWithArgs = this.program.args.join(" ");
      console.log(
        chalk.redBright(`\nUnknown command: "${cmd}".`),
        chalk.cyanBright(`Did you mean "${closestCommand}"?`),
        chalk.bgBlack(`\n$ seal ${cmdWithArgs}`),
        chalk.italic(
          chalk.magentaBright("\nUse --help for list of available commands\n")
        )
      );
      process.exit(1);
    });

    await this.program.parseAsync();
  }
}
