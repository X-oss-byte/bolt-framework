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
exports.connectToVmOnce = exports.connecToVm = void 0;
const chalk_1 = __importDefault(require("chalk"));
const ssh2_1 = require("ssh2");
const constants_1 = require("../constants");
const exit_with_msg_1 = require("./exit-with-msg");
const connecToVm = () => __awaiter(void 0, void 0, void 0, function* () {
    const interval = 5000;
    const maxDuration = 5 * 60 * 1000;
    const maxIterations = Math.floor(maxDuration / interval);
    let currentCounter = 0;
    let isReady = false;
    return new Promise((resolve, _reject) => {
        try {
            const pollConnection = setInterval(() => {
                currentCounter++;
                const conn = new ssh2_1.Client();
                conn.connect(constants_1.VM_CONFIG);
                conn.on("ready", () => {
                    clearInterval(pollConnection);
                    if (isReady) {
                        return resolve(conn);
                    }
                    isReady = true;
                    console.log(chalk_1.default.green(">> Successfully connected to VM..."));
                    return resolve(conn);
                });
                conn.on("error", (err) => { });
                if (currentCounter >= maxIterations) {
                    clearInterval(pollConnection);
                    (0, exit_with_msg_1.exitWithMsg)(">> Maximum Tries exceeded");
                }
            }, interval);
        }
        catch (error) {
            (0, exit_with_msg_1.exitWithMsg)(">> Error establishing connection", error);
        }
    });
});
exports.connecToVm = connecToVm;
const connectToVmOnce = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, _reject) => {
        try {
            const conn = new ssh2_1.Client();
            conn.connect(constants_1.VM_CONFIG);
            conn.on("ready", () => {
                return resolve(conn);
            });
            conn.on("error", (error) => {
                (0, exit_with_msg_1.exitWithMsg)(">> Error establishing connection", error);
            });
        }
        catch (error) {
            (0, exit_with_msg_1.exitWithMsg)(">> Error establishing connection", error);
        }
    });
});
exports.connectToVmOnce = connectToVmOnce;
