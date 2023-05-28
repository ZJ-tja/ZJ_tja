modules.LightSwitch = function( night: any ) {
	if ( night ) {
		document.body.classList.add( "night" );
		libs.Cookies.Set( "night", "1" );
	} else {
		document.body.classList.remove( "night" );
		libs.Cookies.Remove( "night" );
	}
}
window.addEventListener( "pageshow", ( event ) => {
	let state = libs.Cookies.Get( "LightSwitch" );
	if( state !== null )
		modules.LightSwitch( state );
});