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
const execute_1 = require("../helpers/execute");
const validate_project_status_1 = require("../helpers/validate-project-status");
function default_1(containerName) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = yield (0, validate_project_status_1.validateProjectStatus)(containerName, "exec");
        const sshPort = project === null || project === void 0 ? void 0 : project.sshPort;
        if (project && sshPort) {
            console.log(chalk_1.default.yellow(`Opening shell for ${containerName}...`));
            const args = ["-p", sshPort.toString(), "sealvm@localhost"];
            yield (0, execute_1.execute)("ssh", args, {
                stdio: "inherit",
                shell: true,
            });
        }
    });
}
exports.default = default_1;
