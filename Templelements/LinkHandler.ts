libs.LinkHandler = {
	Listeners: [],
	Event: function( event: any ) {
		let href = event.target.getAttribute( "href" );
		if ( !href || href.includes( "javascript:" ) )
			return;

		if ( href[ 0 ] == "#" ) {
			let target = document.getElementById( href.substr( 1 ) );
			if ( target )
				target.scrollIntoView( { behavior: 'smooth' } );
		}

		console.log( "HREF" + href );
		event.preventDefault();
		return false;
	},
	Bind: function() {
		let i, a, a_list;
		for ( i = libs.LinkHandler.Listeners.length;i--; ) {
			if ( !( a = libs.LinkHandler.Listeners[ i ] ) )
				continue;

			a.removeEventListener( "click", libs.LinkHandler.Event );
			libs.LinkHandler.Listeners.splice( i, 1 );
		}

		a_list = document.querySelectorAll( "a" );
		for ( i = a_list.length;i--; ) {
			a = a_list[ i ];
			a.addEventListener( "click", libs.LinkHandler.Event );
			libs.LinkHandler.Listeners.push( a );
		}
	}
}
window.addEventListener( 'pageshow', (event)=>{
	libs.LinkHandler.Bind();
} );
