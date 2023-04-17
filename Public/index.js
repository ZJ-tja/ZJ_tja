"use strict";
var globals = window; //TS-debug
const IO = globals["io"]("", { transports: ['websocket'] });
function Nav(id = "NavContext", expand = false) {
    let eNav;
    if ((eNav = document.getElementById(id)))
        eNav.className = expand ? "expand" : "";
}
(function () {
    let eCurrentYear;
    if ((eCurrentYear = document.getElementById("CurrentYear")))
        eCurrentYear.innerHTML = new Date().getFullYear().toString();
    Nav();
})();
