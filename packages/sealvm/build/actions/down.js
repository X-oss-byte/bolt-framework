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
const fs_exists_1 = require("../helpers/fs-exists");
const exit_with_msg_1 = require("../helpers/exit-with-msg");
const kill_process_1 = require("../helpers/kill-process");
const update_store_1 = require("../helpers/update-store");
const validate_seal_file_1 = require("../helpers/validate-seal-file");
const vm_1 = __importDefault(require("../runners/vm"));
const validate_project_status_1 = require("../helpers/validate-project-status");
function default_1(projectPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const localPath = projectPath === "." ? process.cwd() : (0, path_1.join)(process.cwd(), projectPath);
        if (!(yield (0, fs_exists_1.exists)(localPath))) {
            (0, exit_with_msg_1.exitWithMsg)(">> Please specify correct path to the project");
            return;
        }
        const sealConfig = yield (0, validate_seal_file_1.validateSealFile)(localPath);
        const project = yield (0, validate_project_status_1.validateProjectStatus)(sealConfig.name, "down");
        // Unmounting the project
        console.log(chalk_1.default.yellow(`>> Unmounting project...`));
        yield (0, kill_process_1.killProcess)(project.mountProcessId);
        console.log(chalk_1.default.green(`>> Project unmounted successfully...\n`));
        // Killing VM process
        console.log(chalk_1.default.yellow(`>> Exiting from VM...`));
        yield vm_1.default.destroy(project.vmProcessId);
        console.log(chalk_1.default.green(`>> VM exited successfully...\n`));
        // Updating metadata
        const json = Object.assign(Object.assign({}, project), { sshPort: null, status: "down", vmProcessId: null, mountProcessId: null, sshProcessIds: null, projectRunnerId: null, updatedAt: Date.now() });
        yield (0, update_store_1.updateStore)("projects", sealConfig.name, json);
        console.log(chalk_1.default.green(`>> Project "${sealConfig.name}" is down`));
    });
}
exports.default = default_1;
