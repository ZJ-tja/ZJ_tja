"use strict";
modules.Messages = {
    Count: 0,
    Element: function (type, message) {
        let container, icon, text, button;
        if (!(container = document.getElementById("Messages")))
            return;
        modules.Messages.Count += 1;
        message = document.createElement("div");
        message.className = type;
        icon = document.createElement("span");
        icon.className = "icon";
        text = document.createElement("span");
        text.append(message);
        button = document.createElement("span");
        button.className = "button";
        button.setAttribute("onclick", "modules.Messages.Close(" + modules.Messages.Count + ")");
        message.appendChild(icon);
        message.appendChild(text);
        message.appendChild(button);
        container.append(message);
    },
    Error: function (message) {
        modules.Messages.Element("error", message);
    },
    Info: function (message) {
        modules.Messages.Element("info", message);
    },
    Warn: function (message) {
        modules.Messages.Element("warn", message);
    },
    Success: function (message) {
        modules.Messages.Element("success", message);
    }
};
