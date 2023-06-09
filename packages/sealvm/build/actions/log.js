"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const execute_1 = require("../helpers/execute");
const fs_exists_1 = require("../helpers/fs-exists");
const exit_with_msg_1 = require("../helpers/exit-with-msg");
const validate_seal_file_1 = require("../helpers/validate-seal-file");
const validate_project_status_1 = require("../helpers/validate-project-status");
function default_1(localPath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isFollow = options.follow || false;
            localPath =
                localPath === "." ? process.cwd() : (0, path_1.join)(process.cwd(), localPath);
            // Check for file path exists or not
            if (!(yield (0, fs_exists_1.exists)(localPath))) {
                (0, exit_with_msg_1.exitWithMsg)(">> Please specify correct path to initialize");
                return;
            }
            // Check for valid sealvm yml file
            const sealConfig = yield (0, validate_seal_file_1.validateSealFile)(localPath);
            // Check if project is already down
            yield (0, validate_project_status_1.validateProjectStatus)(sealConfig.name, "log");
            // Check if .logs folder exists
            const vmLogPath = (0, path_1.join)(localPath, ".logs");
            if (!(yield (0, fs_exists_1.exists)(vmLogPath))) {
                (0, exit_with_msg_1.exitWithMsg)(">> No .logs folder found");
            }
            // Check if out.logs and err.logs file exists
            const outputLogPath = (0, path_1.join)(vmLogPath, "out.log");
            const errorLogPath = (0, path_1.join)(vmLogPath, "err.log");
            if (!(yield (0, fs_exists_1.exists)(outputLogPath))) {
                console.log(chalk_1.default.red(`> out.logs file not found for ${sealConfig.name}`));
                return;
            }
            if (!(yield (0, fs_exists_1.exists)(errorLogPath))) {
                console.log(chalk_1.default.red(`> err.logs file not found for ${sealConfig.name}`));
                return;
            }
            const catLogsCommand = `cat  ${(0, path_1.join)(vmLogPath, "*.log")}`;
            const tailLogsCommand = `tail -f ${(0, path_1.join)(vmLogPath, "*.log")}`;
            const executableCommand = isFollow ? tailLogsCommand : catLogsCommand;
            console.log(chalk_1.default.gray(`$ ${executableCommand}`));
            const args = ["-c", `'${executableCommand}'`];
            yield (0, execute_1.execute)("sh", args, {
                stdio: "inherit",
                shell: true,
            });
        }
        catch (err) {
            console.log(chalk_1.default.red("Error while getting logs: ", err.message));
        }
    });
}
exports.default = default_1;
