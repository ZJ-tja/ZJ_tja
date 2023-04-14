"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Find = exports.Cache = exports.tree = exports.File = void 0;
const fs_1 = require("fs");
const mime_types = {
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".html": "text/html",
    ".svg": "image/svg+xml",
    ".css": "text/css",
    ".js": "application/javascript",
    ".webmanifest": "application/json"
};
class File {
    constructor(type, buffer) {
        this.type = type;
        this.buffer = buffer;
    }
}
exports.File = File;
exports.tree = {};
function Cache(index, root) {
    const map = Array();
    function crawl_tree(path, base) {
        if ((0, fs_1.lstatSync)(root + "/" + base + path).isDirectory()) {
            for (const file of (0, fs_1.readdirSync)(root + "/" + base + path)) {
                const ext = file.slice(file.lastIndexOf("."));
                if ([".scss", ".ts"].includes(ext))
                    continue;
                crawl_tree("/" + file, base + path);
            }
        }
        else
            map.push(base + path);
    }
    crawl_tree(index, "");
    function crawl_branch(branch, filepath) {
        let path = filepath;
        while (true) {
            const fiber_size = path.indexOf("/");
            if (fiber_size == -1) {
                const ext = path.slice(path.lastIndexOf("."));
                const uri = path.replace("index.html", "").replace(".html", "");
                const mime = mime_types.hasOwnProperty(ext) ? mime_types[ext] : 'application/octet-stream';
                branch[uri] = new File(mime, (0, fs_1.readFileSync)(root + "/" + filepath));
                break;
            }
            const fiber = path.slice(0, fiber_size);
            if (!(fiber in branch))
                branch[fiber] = {};
            branch = branch[fiber];
            path = path.slice(fiber_size + 1);
        }
    }
    for (let filepath of map) {
        (0, fs_1.watch)(root + "/" + filepath, (eventType, filename) => {
            if (eventType == "change")
                crawl_branch(exports.tree, filepath);
        });
        crawl_branch(exports.tree, filepath);
    }
    return exports.tree[index];
}
exports.Cache = Cache;
function Find(index, uri) {
    let branch = exports.tree[index];
    while (true) {
        const fiber_size = uri.indexOf("/");
        if (fiber_size == -1) {
            if (uri in branch && branch[uri] instanceof File)
                return branch[uri];
        }
        const fiber = uri.slice(0, fiber_size);
        if (fiber in branch) {
            branch = branch[fiber];
            uri = uri.slice(fiber_size + 1);
        }
        else
            break;
    }
    return {};
}
exports.Find = Find;
exports.default = {
    Cache: Cache,
    Find: Find,
    File: File,
    Tree: exports.tree
};
