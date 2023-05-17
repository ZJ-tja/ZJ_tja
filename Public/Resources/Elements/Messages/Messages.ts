modules.Messages = {
	Count: 0,
	Element: function( type: any, message: any ) {
		let container, icon, text, button;
		if ( !( container = document.getElementById( "Messages" ) ) )
			return;

		modules.Messages.Count += 1;
		message = document.createElement( "div")
		message.className = type;

		icon = document.createElement( "span" );
		icon.className = "icon";

		text = document.createElement( "span" );
		text.append( message );

		button = document.createElement( "span" );
		button.className = "button";
		button.setAttribute( "onclick", "modules.Messages.Close(" + modules.Messages.Count + ")" );

		message.appendChild( icon );
		message.appendChild( text );
		message.appendChild( button );

		container.append( message );
	},
	Error: function( message: any ) {
		modules.Messages.Element( "error", message );
	},
	Info: function( message: any ) {
		modules.Messages.Element( "info", message );
	},
	Warn: function( message: any ) {
		modules.Messages.Element( "warn", message );
	},
	Success: function( message: any ) {
		modules.Messages.Element( "success", message );
	}
}