modules.IO = libs.io( "", { transports: [ 'websocket' ] } );

libs.LinkHandler.Bind();

window.addEventListener( 'pageshow', ( event ) => {
	modules.Nav();
} );

( function() {
	let eCurrentYear;
	if ( ( eCurrentYear = document.getElementById( "CurrentYear" ) ) )
		eCurrentYear.innerHTML = new Date().getFullYear().toString();
}()
);