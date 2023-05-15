"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals = window; //TS-debug
const IO = globals["io"]("", { transports: ['websocket'] });
globals["LinkHandler"] = {
    Listeners: [],
    Event: function (event) {
        console.log(event);
    },
    Bind: function () {
        let i, a, a_list;
        for (i = globals["LinkHandler"].Listeners.length; i--;) {
            if (!(a = globals["LinkHandler"].Listeners[i]))
                continue;
            a.removeEventListener("click", globals["LinkHandler"].Event);
            globals["LinkHandler"].Listeners.splice(i, 1);
        }
        a_list = document.querySelectorAll("a");
        for (i = a_list.length; i--;) {
            a = a_list[i];
            a.addEventListener("click", globals["LinkHandler"].Event);
            globals["LinkHandler"].Listeners.push(a);
        }
    }
};
function Nav(open = false, type = "context") {
    let eNavs = document.getElementsByTagName("nav");
    for (const eNav of eNavs) {
        if (eNav.querySelector(`[type="${type}"]`)) {
            if (open)
                eNav.className += " open";
            else
                eNav.className = eNav.className.replace(" open", "");
            break;
        }
    }
}
(function () {
    let eCurrentYear;
    if ((eCurrentYear = document.getElementById("CurrentYear")))
        eCurrentYear.innerHTML = new Date().getFullYear().toString();
    Nav();
})();
