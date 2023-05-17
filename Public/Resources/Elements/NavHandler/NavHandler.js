"use strict";
modules.LinkHandler = {
    Listeners: [],
    Event: function (event) {
        let href = event.target.getAttribute("href");
        if (!href || href.includes("javascript:"))
            return;
        console.log("HREF" + href);
        event.preventDefault();
        return false;
    },
    Bind: function () {
        let i, a, a_list;
        for (i = modules.LinkHandler.Listeners.length; i--;) {
            if (!(a = modules.LinkHandler.Listeners[i]))
                continue;
            a.removeEventListener("click", modules.LinkHandler.Event);
            modules.LinkHandler.Listeners.splice(i, 1);
        }
        a_list = document.querySelectorAll("a");
        for (i = a_list.length; i--;) {
            a = a_list[i];
            a.addEventListener("click", modules.LinkHandler.Event);
            modules.LinkHandler.Listeners.push(a);
        }
    }
};
