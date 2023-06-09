import chalk from "chalk";
import treekill from "tree-kill";

export const killProcess = (processId: number) => {
  return new Promise((resolve, reject) => {
    treekill(processId, "SIGTERM", (err) => {
      if (err) {
        console.log(chalk.red(">> Error killing process:", err.message));
        return reject(err);
      } else {
        console.log(chalk.green(">> Exited from the process successfully."));
        return resolve(true);
      }
    });
  });
};
