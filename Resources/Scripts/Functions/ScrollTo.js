"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollTo = void 0;
function ScrollTo(id) {
    let ctx, target;
    if (!(ctx = document.getElementById("Context")))
        return;
    if (!(target = document.getElementById(id)))
        return;
    console.log(target.offsetTop);
    ctx.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
}
exports.ScrollTo = ScrollTo;
