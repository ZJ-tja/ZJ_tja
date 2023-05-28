"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var libs = window; //TS debug
var modules = {};
libs.M = function (name, required = true) {
    if (required) {
        if (modules.hasOwnProperty(name))
            return modules[name];
        return new Promise((resolve, reject) => {
            let count = 0, interval = window.setInterval(() => {
                count++;
                if (modules.hasOwnProperty(name)) {
                    clearInterval(interval);
                    resolve(modules[name]);
                }
                else if (count > 100)
                    reject("Timeout");
            }, 100);
        });
    }
};
modules.Templelements = {
    List: [],
    Count: 0,
    Max: 0,
    Loading: false,
    LoadTick: function () {
        return __awaiter(this, void 0, void 0, function* () {
            let e_container, e_status, e_progress;
            if (!(e_container = document.getElementById("Loader")))
                return setTimeout(modules.Templelements.Activate, 100);
            if (modules.Templelements.Loading == false) {
                let e_loader, e_title;
                e_loader = document.createElement("div");
                e_status = document.createElement("div");
                e_status.className = "status";
                e_title = document.createElement("div");
                e_title.className = "title";
                e_title.innerHTML = "Trwa ładowanie...";
                e_progress = document.createElement("progress");
                e_loader.appendChild(e_title);
                e_loader.appendChild(e_progress);
                e_loader.appendChild(e_status);
                e_container.appendChild(e_loader);
                modules.Templelements.Loading = true;
            }
            if (!(e_status = e_container.querySelector(".status")))
                return console.log("Status not found");
            if (!(e_progress = e_container.querySelector("progress")))
                return console.log("Progress not found");
            let element = modules.Templelements.List.shift(), e_element, size = -1, response = yield fetch(element.uri, {
                method: 'GET',
                headers: { 'X-HTTP-Method-Override': 'HEAD' },
            });
            if (response)
                size = modules.Templelements.Size(yield response.headers.get("Content-Length"));
            e_status.innerHTML = "[" + modules.Templelements.Count + "/" + modules.Templelements.Max + "]Pobieranie: " + modules.Templelements.CutR(element.uri, 30) + " (" + size + ")";
            e_progress.value = modules.Templelements.Count;
            e_progress.max = modules.Templelements.Max;
            function OnLoad() {
                var _a;
                let e_progress;
                if (!(e_progress = document.body.querySelector("#Loader progress")))
                    return console.error("OnLoad: #Loader progress not found");
                modules.Templelements.Count++;
                e_progress.value = modules.Templelements.Count;
                if (modules.Templelements.Count == modules.Templelements.Max) {
                    (_a = document.querySelector("#Loader div")) === null || _a === void 0 ? void 0 : _a.remove();
                    modules.Templelements.Loading = false;
                }
                else
                    modules.Templelements.LoadTick();
            }
            function OnError() {
                OnLoad();
                console.error("#Loader error on loading element: " + element.uri);
            }
            switch (element.type) {
                case "style":
                    e_element = document.createElement("link");
                    e_element.rel = "stylesheet";
                    e_element.href = element.uri;
                    e_element.onload = OnLoad;
                    e_element.onerror = OnError;
                    document.head.appendChild(e_element);
                    break;
                case "lib":
                    e_element = document.createElement("script");
                    e_element.src = element.uri;
                    e_element.onload = OnLoad;
                    e_element.onerror = OnError;
                    document.head.appendChild(e_element);
                    break;
                case "module":
                    e_element = document.createElement("script");
                    e_element.src = element.uri;
                    e_element.onload = OnLoad;
                    e_element.onerror = OnError;
                    document.body.appendChild(e_element);
                    break;
                case "img":
                    let target;
                    if (!element.hasOwnProperty("target") || !(target = document.getElementById(element.target)))
                        return console.error("Img: #Loader target not found");
                    target.src = element.uri;
                    target.onload = OnLoad;
                    target.onerror = OnError;
                    break;
                default: console.error("#Loader unkown type: " + element.type);
            }
        });
    },
    Add: function () {
        for (const element of arguments) {
            modules.Templelements.List.push(element);
            modules.Templelements.Max++;
        }
        if (modules.Templelements.Loading == false)
            modules.Templelements.LoadTick();
    },
    Size: function (value) {
        let size = parseInt(value, 10), unit = " B";
        if (size / 1024 > 1) {
            unit = " KB";
            size = size / 1024;
        }
        if (size / 1024 > 1) {
            unit = " MB";
            size = size / 1024;
        }
        if (size / 1024 > 1) {
            unit = " GB";
            size = size / 1024;
        }
        return (Math.round(size * 100) / 100) + unit;
        // if ( size % 1024 != 0 )
        // content_length =  / 1024 / 1024;
    },
    CutL: function (string, size, suffix = "...") {
        return string.slice(0, size) + suffix;
    },
    CutR: function (string, size, preffix = "...") {
        let length = string.length;
        if (length > size)
            length = length - size;
        return preffix + string.slice(string.length - length);
    }
};
