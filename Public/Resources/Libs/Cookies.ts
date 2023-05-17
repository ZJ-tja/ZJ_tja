export const Cookies = {
	List: {} as { [ key: string ]: any },
	Set: function( name: string, value: string, expires?: string ) {
		document.cookie = name + "=" + value + ( typeof expires == "string" ? "; expires=" + expires : "" ) + "; SameSite=None; Secure";
		Cookies.List[ name ] = value;
	},
	Get: function( name: string ) {
		if ( Cookies.List.hasOwnProperty( name ) )
			return Cookies.List[ name ];
	},
	Remove: function( name: string ) {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
		delete Cookies.List[ name ];
	}
}
if ( document.cookie !== "" ) {
	for ( let cookie of document.cookie.split( "; " ) ) {
		let parts = cookie.split( "=" );
		Cookies.List[ parts[ 0 ] ] = parts[ 1 ];
	}
}