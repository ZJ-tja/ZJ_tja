var globals: { [ key: string ]: any } = window;//TS-debug
const IO: any = globals[ "io" ]( "", { transports: [ 'websocket' ] } );


function Nav( id = "NavContext", open =false ) {
	let eNav;
	if ( ( eNav = document.getElementById( id ) ) )
		eNav.className = open ? "open" : "";
}

(function(){
	let eCurrentYear;
	if ( ( eCurrentYear = document.getElementById( "CurrentYear" ) ) )
		eCurrentYear.innerHTML = new Date().getFullYear().toString();

	Nav();
})();

