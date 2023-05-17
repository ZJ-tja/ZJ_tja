"use strict";
var modules = window; //TS-debug
const IO = modules["io"]("", { transports: ['websocket'] });
modules["LinkHandler"] = {
    Listeners: [],
    Event: function (event) {
        console.log(event);
    },
    Bind: function () {
        let i, a, a_list;
        for (i = modules["LinkHandler"].Listeners.length; i--;) {
            if (!(a = modules["LinkHandler"].Listeners[i]))
                continue;
            a.removeEventListener("click", modules["LinkHandler"].Event);
            modules["LinkHandler"].Listeners.splice(i, 1);
        }
        a_list = document.querySelectorAll("a");
        for (i = a_list.length; i--;) {
            a = a_list[i];
            a.addEventListener("click", modules["LinkHandler"].Event);
            modules["LinkHandler"].Listeners.push(a);
        }
    }
};
window.addEventListener('pageshow', (event) => {
    modules.Nav();
    modules["LinkHandler"].Bind();
});
(function () {
    let eCurrentYear;
    if ((eCurrentYear = document.getElementById("CurrentYear")))
        eCurrentYear.innerHTML = new Date().getFullYear().toString();
}());
