modules.Nav = function( burger = "ContextBurger", type = "context" ) {
	let open, eNavs = document.getElementsByTagName( "nav" );
	if ( !( open = document.getElementById( burger ) as HTMLInputElement ) )
		return;

	for ( const eNav of eNavs ) {
		if ( eNav.querySelector( `[type="${ type }"]` ) ) {
			if ( open.checked )
				eNav.className += " open";
			else
				eNav.className = eNav.className.replace( " open", "" );
			break;
		}
	}
};
// window.addEventListener( 'pageshow', ( event ) => { modules.Nav(); });