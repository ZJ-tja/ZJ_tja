import { lstatSync, readFileSync, readdirSync, watch } from "fs";

const mime_types: { [ ext: string ]: string } = {
	".png": "image/png",
	".ico": "image/x-icon",
	".html": "text/html",
	".svg": "image/svg+xml",
	".css": "text/css",
	".js": "application/javascript",
	".webmanifest": "application/json"
};

export class File {
	type: string;
	buffer: Buffer;

	constructor ( type: string, buffer: Buffer ) {
		this.type = type;
		this.buffer = buffer;
	}
}

interface Dir {
	[ name: string ]: any
}

export const tree: Dir = {};
export function Cache( index: string, root: string ) {
	const map = Array();
	function crawl_tree( path: string, base: string ) {
		if ( lstatSync( root + "/" + base + path ).isDirectory() ) {
			for ( const file of readdirSync( root + "/" + base + path )) {
				const ext = file.slice( file.lastIndexOf( "." ) );
				if ( [ ".scss", ".ts" ].includes( ext ) )
					continue;

				crawl_tree( "/" + file, base + path );
			}
		} else
			map.push(base + path);
	}
	crawl_tree( index, "" );
	function crawl_branch( branch: Dir, filepath: string ) {

		let path = filepath;
		while ( true ) {
			const fiber_size = path.indexOf( "/" );
			if ( fiber_size == -1 ) {
				const ext = path.slice( path.lastIndexOf( "." ) );
				const uri = path.replace( "index.html", "" ).replace( ".html", "" );
				const mime = mime_types.hasOwnProperty( ext ) ? mime_types[ ext ] : 'application/octet-stream';
				branch[ uri ] = new File( mime, readFileSync( root + "/" + filepath ) );
				break;
			}

			const fiber = path.slice( 0, fiber_size );
			if ( !( fiber in branch ) )
				branch[ fiber ] = {};

			branch = branch[ fiber ];
			path = path.slice( fiber_size + 1 );
		}
	}
	for( let filepath of map ) {
		watch( root + "/" + filepath, (eventType, filename) => {
			if( eventType == "change" )
				crawl_branch( tree, filepath );
		} );
		crawl_branch( tree, filepath );
	}
	return tree[index];
}

export function Find( index: string, uri: string ): object {
	let branch = tree[ index ];
	while( true ) {
		const fiber_size = uri.indexOf( "/" );
		if( fiber_size == -1 ) {
			if( uri in branch && branch[ uri ] instanceof File )
				return branch[ uri ];
		}
		const fiber = uri.slice( 0, fiber_size );
		if ( fiber in branch ) {
			branch = branch[ fiber ];
			uri = uri.slice( fiber_size + 1 );
		} else
			break;
	}
	return {};
}

export default {
	Cache: Cache,
	Find: Find,
	File: File,
	Tree: tree
};