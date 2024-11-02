export const favorite = (element, type, id) => {
    element.addEventListener("click", () => {
        const favoriteObj = JSON.parse(localStorage.getItem("favorite"));
        if (favoriteObj[type].includes(id)) {
            favoriteObj[type].splice(favoriteObj[type].indexOf(id), 1);
            element.classList.remove("active");
        } else {
            favoriteObj[type].push(id);
            element.classList.add("active");
        }
        localStorage.setItem("favorite", JSON.stringify(favoriteObj));
    })
}   