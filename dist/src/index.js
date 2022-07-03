"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const args = yargs_1.default.options({
    mcVersion: {
        type: 'string',
        demandOption: true,
        alias: 'v',
    },
}).argv;
console.log(args);
