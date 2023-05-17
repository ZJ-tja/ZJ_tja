import { readFileSync, writeFileSync } from "fs";

const source_file = process.argv[ 1 ];
console.log( "Loading source file " + source_file );

var file = readFileSync( "Src/" + source_file, "utf8" );

var compiler = readFileSync( "Src/" + source_file + ".compiler", "utf8" );

function Compile( html: string ) {

	return html;
}

var compiled_file = Compile( file );


