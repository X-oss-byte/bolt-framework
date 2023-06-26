// import DeployClass from "./deploy";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (options, isWatch = false) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Coming soon...");
        process.exit();
        // console.log(
        //   "\n> Note: Please remove any zip file or unnecessary files/folders from your project before deploying!"
        // );
        // console.log("\n> Deploying project...");
        // const deploy = new DeployClass();
        // console.log("\n> Gathering all deployable services...");
        // // populate store
        // await deploy.setStore();
        // // populate services
        // await deploy.setServices();
        // // Showcase the services that are going to be deployed
        // console.log("> Found %d deployable services...\n", deploy.services.length);
        // if (!deploy.services.length) {
        //   console.log("> No services found! Please run glue build and try again!");
        //   process.exit(1);
        // }
        // // Create project's zip file
        // console.log("> Compressing the project...");
        // await deploy.createZip();
        // // authenticate the user & store creds in local store
        // console.log("\n> Authenticating user credentials...");
        // await deploy.auth(options.auth);
        // console.log("> Authentication successful!\n");
        // // uploads the project zip file to minio
        // console.log("> Uploading project zip file...");
        // await deploy.upload();
        // console.log("> Project zip file uploaded successfully!\n");
        // // save store
        // await deploy.saveStore();
        // if (isWatch) {
        //   console.log("> Fetching deployment details...\n");
        //   await deploy.watch();
        // }
    });
});
