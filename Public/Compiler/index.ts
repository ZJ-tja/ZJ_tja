modules.IO = libs.io( "", { transports: [ 'websocket' ] } );

modules.IO.on( "Message", ( type:any, message: any, params: any ) => {
	for( let i = params.length; i--; )
		message.replace( "{" + ( i + 1 ) + "}", params[ i ] );

	switch( type ) {
		case "Error": modules[ "Messages" ].Error( message ); break;
		case "Warn": modules[ "Messages" ].Warn( message ); break;
		case "Success": modules[ "Messages" ].Success( message ); break;
		case "Info": modules[ "Messages" ].Info( message ); break;
		default: console.log( message );
	}
});

modules.Compiler = {
	GetPages: function() {
		modules.IO.emit( "GetPages", ( pages: any ) => {
			console.log(pages)
		} );
	},
	GetPage: function( name : string ) {
		modules.IO.emit( "GetPage", name );
	},
	CreatePage: function( name : string ) {
		modules.IO.emit( "CreatePage", name );
	},
}

window.addEventListener( 'pageshow', ( event ) => {
	modules.Nav();
	modules.LinkHandler.Bind();
} );

( function() {
	let eCurrentYear;
	if ( ( eCurrentYear = document.getElementById( "CurrentYear" ) ) )
	eCurrentYear.innerHTML = new Date().getFullYear().toString();}()
);