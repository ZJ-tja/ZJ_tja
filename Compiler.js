"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const source_file = process.argv[1];
console.log("Loading source file " + source_file);
var file = (0, fs_1.readFileSync)("Src/" + source_file, "utf8");
var compiler = (0, fs_1.readFileSync)("Src/" + source_file + ".compiler", "utf8");
function Compile(html) {
    return html;
}
var compiled_file = Compile(file);
