import { addEventOnElements } from "./utils/event.js";

const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
    header.classList[this.window.scrollY > 50 ? "add" : "remove"]("active")
})
window.filterObj = {
}

// nav bar toggle

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const nav = document.querySelector("[data-navigation]");
addEventOnElements(navTogglers, "click", () => {
    nav.classList.toggle("show");
})
// initialize the favorite object
if (!localStorage.getItem("favorite")) {
    localStorage.setItem("favorite", JSON.stringify({
        photos: [],
        videos: []
    }));
}