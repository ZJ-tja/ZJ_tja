"use strict";
modules.Notifications = {
    Count: 0,
    Element: function (type, message, settings = {}) {
        let container, icon, text, button;
        if (!(container = document.getElementById("Messages")))
            return;
        modules.Notifications.Count += 1;
        message = document.createElement("div");
        message.id = "Notifications" + modules.Notifications.Count;
        message.className = type;
        icon = document.createElement("span");
        icon.className = "icon";
        text = document.createElement("span");
        text.append(message);
        button = document.createElement("span");
        button.className = "button";
        button.setAttribute("onclick", "modules.Notifications.Close(" + modules.Notifications.Count + ")");
        message.appendChild(icon);
        message.appendChild(text);
        message.appendChild(button);
        container.append(message);
    },
    Error: function (message, settings = {}) {
        modules.Notifications.Element("error", message, settings);
    },
    Info: function (message, settings = {}) {
        modules.Notifications.Element("info", message, settings);
    },
    Warn: function (message, settings = {}) {
        modules.Notifications.Element("warn", message, settings);
    },
    Success: function (message, settings = {}) {
        modules.Notifications.Element("success", message, settings);
    }
};
