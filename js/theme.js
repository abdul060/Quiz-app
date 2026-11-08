// theme.js - light/dark mode for the whole app
// Load this as a normal (non-module) script in the <head> of EVERY page,
// so the right theme is set before the page is drawn (no white flash).

(function () {
    var KEY = "theme";

    function getSaved() {
        try {
            return localStorage.getItem(KEY);
        } catch (error) {
            return null;
        }
    }

    // Saved choice first, otherwise follow the device setting
    function getTheme() {
        var saved = getSaved();
        if (saved === "dark" || saved === "light") return saved;
        var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }

    function setTheme(theme) {
        try {
            localStorage.setItem(KEY, theme);
        } catch (error) {
            // storage blocked: the theme still changes, it just is not remembered
        }
        applyTheme(theme);
    }

    window.Theme = { get: getTheme, set: setTheme };
    applyTheme(getTheme());
})();