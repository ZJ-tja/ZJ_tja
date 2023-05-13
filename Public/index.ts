var globals: { [ key: string ]: any } = window;//TS-debug
const IO: any = globals[ "io" ]( "", { transports: [ 'websocket' ] } );


function Nav( open = false, type ="context" ) {
	let eNavs = document.getElementsByTagName( "nav" );
	for ( const eNav of eNavs ) {
		if ( eNav.querySelector( `[type="${ type }"]` ) ) {
			if ( open )
				eNav.className += " open";
			else
				eNav.className = eNav.className.replace( " open", "" );
			break;
		}
	}
}

function ScrollTo( id: string ) {
	let ctx, target;
	if ( !( ctx = document.getElementById( "Context" ) ) )
		return;
	
	if ( !( target = document.getElementById( id ) ) )
		return;

	console.log( target.offsetTop )
	ctx.scrollTo( { top: target.offsetTop, behavior: 'smooth' } )
}

(function(){
	let eCurrentYear;
	if ( ( eCurrentYear = document.getElementById( "CurrentYear" ) ) )
		eCurrentYear.innerHTML = new Date().getFullYear().toString();

	Nav();
})();

