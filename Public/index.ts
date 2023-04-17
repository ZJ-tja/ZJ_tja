var globals: { [ key: string ]: any } = window;//TS-debug
const IO: any = globals[ "io" ]( "", { transports: [ 'websocket' ] } );


function Nav( open = false, type ="context" ) {
	let eNavs = document.getElementsByTagName( "nav" );
	for ( const eNav of eNavs ) {
		if ( eNav.querySelector( `[type="${ type }"]` ) ) {
			eNav.className = open ? "open" : "";
			break;
		}
	}
}

(function(){
	let eCurrentYear;
	if ( ( eCurrentYear = document.getElementById( "CurrentYear" ) ) )
		eCurrentYear.innerHTML = new Date().getFullYear().toString();

	Nav();
})();

