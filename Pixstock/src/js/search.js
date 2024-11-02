import { addEventOnElements } from "./utils/event.js";
import { updateUrl } from "./utils/updateUrl.js";
const searchTogglers = document.querySelectorAll("[data-search-toggler]")
const searchView = document.querySelector("[data-search-view]");
addEventOnElements(searchTogglers, "click", (e) => {
    searchView.classList.toggle("show");
});
const dataSearchField = document.querySelector("[data-search-field]");
const clearButton = document.querySelector("[data-search-clear-btn]");
clearButton.addEventListener("click", () => dataSearchField.value = "");
// segment button
const segmentButtons = document.querySelectorAll("[data-segment-btn]");
window.searchType = document.querySelector("[data-segment-btn].selected").dataset.segmentValue;
addEventOnElements(segmentButtons, "click", (e) => {
    let lastSegmentSelected = document.querySelector("[data-segment-btn].selected");
    lastSegmentSelected.classList.remove("selected");
    e.currentTarget.classList.add("selected");
    window.searchType = e.currentTarget.dataset.segmentValue;
})
// Search Submit
const searchButton = document.querySelector("[data-search-btn]");
searchButton.addEventListener("click", () => {
    const inputDataField = document.querySelector("[data-search-field]").value;
    if (inputDataField) {
        updateSearchHistory(inputDataField)
        window.filterObj.query = inputDataField;
        updateUrl(window.filterObj, window.searchType);
    }
})

let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
if (searchHistory) {
    let stringElements = "";
    searchHistory.forEach(element => {
        const Element = `<button class="list-item" data-ripple>
                            <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
                            <span class="body-large text">${element}</span>
                            <div class="state-layer"></div>
                        </button>
                        `
        stringElements += "\n" + Element;
    });
    const searchList = document.querySelector(".list")
    searchList.innerHTML = stringElements;
    const allItems = document.querySelectorAll(".list-item");
    allItems.forEach(element => {
        element.addEventListener("click", () => {
            dataSearchField.value = element.querySelector(".text").textContent;
            searchButton.click();
        })
    })
} else {
    localStorage.setItem("searchHistory",JSON.stringify([]));
}
const updateSearchHistory = (inputDataField) => {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory.includes(inputDataField)) {
        searchHistory.splice(searchHistory.indexOf(inputDataField), 1);
    }
    searchHistory.unshift(inputDataField);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
dataSearchField.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        searchButton.click();
    }
})

