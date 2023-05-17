"use strict";
modules.Loadings = {
    Count: 0,
    Load: function (name, max) {
        let loadings, loading, title, progress_bar;
        if (!(loadings = document.getElementById("Loadings")))
            return;
        modules.Loadings.Count += 1;
        loading = document.createElement("span");
        loading.id = "loading" + modules.Loadings.Count;
        title = document.createElement("div");
        title.append(name);
        progress_bar = document.createElement("progress");
        if (max)
            progress_bar.max = max;
        loading.append(title);
        loading.append(progress_bar);
        loadings.appendChild(loading);
        return loading.className;
    },
    Update: function (id, value) {
        let loading, progress_bar;
        if (!(loading = document.getElementById(id)) || !(progress_bar = loading.querySelector("progress")))
            return;
        if (progress_bar.value)
            progress_bar.value += value;
        else
            progress_bar.value = value;
        if (progress_bar.value == progress_bar.max)
            modules.Loadings.Finish(id);
        return progress_bar.value;
    },
    Finish: function (id) {
        let loading;
        if (!(loading = document.getElementById(id)))
            return;
        loading.className = "finished";
        setTimeout(function () {
            let loading = document.getElementById(id);
            if (loading)
                loading.remove();
        }, id);
    }
};
