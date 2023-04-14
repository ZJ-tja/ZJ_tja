"use strict";
var _a;
class Cookies {
    static Set(name, value, expires) {
        document.cookie = name + "=" + value + (typeof expires == "string" ? "; expires=" + expires : "") + "; SameSite=None; Secure";
        this.List[name] = value;
    }
    static Get(name) {
        if (this.List.hasOwnProperty(name))
            return this.List[name];
    }
    static Remove(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
        delete this.List[name];
    }
}
_a = Cookies;
Cookies.List = {};
(() => {
    if (document.cookie !== "") {
        for (let cookie of document.cookie.split("; ")) {
            let parts = cookie.split("=");
            _a.List[parts[0]] = parts[1];
        }
    }
})();
