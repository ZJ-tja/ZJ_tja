modules.Notifications = {
	Count: 0,
	Element: function( type: any, message: any, settings: any = {} ) {
		let container, icon, text, button;
		if ( !( container = document.getElementById( "Messages" ) ) )
			return;

		modules.Notifications.Count += 1;
		message = document.createElement( "div")
		message.id = "Notifications" + modules.Notifications.Count;
		message.className = type;

		icon = document.createElement( "span" );
		icon.className = "icon";

		text = document.createElement( "span" );
		text.append( message );

		button = document.createElement( "span" );
		button.className = "button";
		button.setAttribute( "onclick", "modules.Notifications.Close(" + modules.Notifications.Count + ")" );

		message.appendChild( icon );
		message.appendChild( text );
		message.appendChild( button );

		container.append( message );
	},
	Error: function( message: any, settings: any = {} ) {
		modules.Notifications.Element( "error", message, settings );
	},
	Info: function( message: any, settings: any = {} ) {
		modules.Notifications.Element( "info", message, settings );
	},
	Warn: function( message: any, settings: any = {} ) {
		modules.Notifications.Element( "warn", message, settings );
	},
	Success: function( message: any, settings: any = {} ) {
		modules.Notifications.Element( "success", message, settings );
	}
}