const rootElement = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
if (localStorage.getItem("isDark")) {
    rootElement.dataset.theme = localStorage.getItem("isDark");
} else {
    rootElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("isDark",isDark ? "dark" : "light" );
}
window.addEventListener("load", function(e) {
    const themeBtn = document.querySelector("[data-theme-toggler]");
    themeBtn.addEventListener("click", function (e) {
        rootElement.dataset.theme = rootElement.dataset.theme === "light" ? "dark" : "light";
        localStorage.setItem("isDark", rootElement.dataset.theme);
        })
})