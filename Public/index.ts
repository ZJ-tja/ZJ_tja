(function(){
	let eCurrentYear;
	if ( ( eCurrentYear = document.getElementById( "CurrentYear" ) ) )
		eCurrentYear.innerHTML = new Date().getFullYear().toString();
})();
