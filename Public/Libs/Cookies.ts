class Cookies {
	static List: { [ cookie: string ]: string } = {};

	static Set ( name: string, value: string, expires?: string ) {
		document.cookie = name + "=" + value + ( typeof expires == "string" ? "; expires=" + expires : "") + "; SameSite=None; Secure";
		this.List[ name ] = value;
	}

	static Get ( name: string ) {
		if( this.List.hasOwnProperty( name ) )
			return this.List[ name ];
	}

	static Remove ( name: string ) {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
		delete this.List[ name ];
	}

	static {
		if( document.cookie !== "" ) {
			for ( let cookie of document.cookie.split( "; " ) ) {
				let parts = cookie.split( "=" );
				this.List[ parts[ 0 ] ] = parts[ 1 ];
			}
		}
	}
}