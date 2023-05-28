"use strict";
libs.Cookies = {
    List: (function () {
        let list = {};
        for (let cookie of document.cookie.split("; ")) {
            let parts = cookie.split("=");
            list[parts[0]] = parts[1];
        }
        return list;
    })(),
    Set: function (name, value, expires) {
        document.cookie = name + "=" + value + (typeof expires == "string" ? "; expires=" + expires : "") + "; SameSite=None; Secure";
        libs.Cookies.List[name] = value;
    },
    Get: function (name) {
        if (libs.Cookies.List.hasOwnProperty(name))
            return libs.Cookies.List[name];
    },
    Remove: function (name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
        delete libs.Cookies.List[name];
    }
};
