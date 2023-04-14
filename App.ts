import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyIO from "fastify-socket.io";
import Tree from "./Module/Tree";

const server = fastify();

server.register( fastifyIO, {
	transports: [ 'websocket' ],
	serveClient: false,
	cors: {
		origin: "https://zj_tja.onrender.com/"
	}
} );

server.setNotFoundHandler( ( req: FastifyRequest, res: FastifyReply ) => {
	res.statusCode = 404;
	res.type( 'text/html' ).send( 'Not Found! ' + req.url );
} );

function handler( req: FastifyRequest, res: FastifyReply ) {
	const params = "params" in req ? req.params as object : {};
	const uri = "*" in params ? params[ "*" ] as string : "";
	if ( "Finder" in req.routeConfig ) {
		const FileFinder = req.routeConfig.Finder as Function;
		const file: object = FileFinder( uri );
		if ( "type" in file && "buffer" in file )
			return res.header( "Content-Type", file.type ).send( file.buffer );
	}
	res.callNotFound();
}

Tree.Cache( "Public", __dirname );
server.get( "/*", {
	config: {
		Finder: ( uri: string ) => {
			return Tree.Find( "Public", uri );
		}
	}
}, handler );

server.ready().then( () => {
	server.io.on( "connection", ( client ) => {
		console.log( "Connected" )

	} );
} );

const port = ( process.env.PORT || 10000 ) as number;
server.listen( { port: port }, () => {
	console.log( "Server listening on port " + port );
} );