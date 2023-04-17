"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const Tree_1 = __importDefault(require("./Module/Tree"));
const server = (0, fastify_1.default)();
server.register(fastify_socket_io_1.default, {
    transports: ['websocket'],
    serveClient: false,
    cors: {
        origin: "https://zj-tja.onrender.com/"
    }
});
server.setNotFoundHandler((req, res) => {
    res.statusCode = 404;
    res.type('text/html').send('Not Found! ' + req.url);
});
function handler(req, res) {
    const params = "params" in req ? req.params : {};
    const uri = "*" in params ? params["*"] : "";
    if ("Finder" in req.routeConfig) {
        const FileFinder = req.routeConfig.Finder;
        const file = FileFinder(uri);
        if ("type" in file && "buffer" in file)
            return res.header("Content-Type", file.type).send(file.buffer);
    }
    res.callNotFound();
}
Tree_1.default.Cache("Public", __dirname);
server.get("/*", {
    config: {
        Finder: (uri) => {
            return Tree_1.default.Find("Public", uri);
        }
    }
}, handler);
server.ready().then(() => {
    server.io.on("connection", (client) => {
        console.log("Connected");
    });
});
const port = (process.env.PORT || 10000);
server.listen({ port: port }, () => {
    console.log("Server listening on port " + port);
});
