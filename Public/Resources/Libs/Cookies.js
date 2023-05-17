"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
exports.Cookies = {
    List: {},
    Set: function (name, value, expires) {
        document.cookie = name + "=" + value + (typeof expires == "string" ? "; expires=" + expires : "") + "; SameSite=None; Secure";
        exports.Cookies.List[name] = value;
    },
    Get: function (name) {
        if (exports.Cookies.List.hasOwnProperty(name))
            return exports.Cookies.List[name];
    },
    Remove: function (name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
        delete exports.Cookies.List[name];
    }
};
if (document.cookie !== "") {
    for (let cookie of document.cookie.split("; ")) {
        let parts = cookie.split("=");
        exports.Cookies.List[parts[0]] = parts[1];
    }
}
