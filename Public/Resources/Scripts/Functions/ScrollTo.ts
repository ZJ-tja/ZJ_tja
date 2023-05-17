export function ScrollTo( id: string ) {
	let ctx, target;
	if ( !( ctx = document.getElementById( "Context" ) ) )
		return;

	if ( !( target = document.getElementById( id ) ) )
		return;

	console.log( target.offsetTop )
	ctx.scrollTo( { top: target.offsetTop, behavior: 'smooth' } )
}