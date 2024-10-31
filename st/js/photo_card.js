import { favorite } from "./favorite.js"
export const photoCard = (photo) => {
    const {
        alt,
        avg_color,
        width,
        height,
        id,
        src: {
            large
        }

    } = photo;
    
    const card = document.createElement('div');
    card.classList.add("card", "grid-item");
    card.style.backgroundColor = avg_color;
    card.innerHTML = `
        <figure class="card-banner" style="--width:${width};--height:${height};">
            <img src="${large}" alt="${alt}" srcset="" class="img-cover" width="${width}" height="${height}">
        </figure>
        <div class="card-content">
            <button class="icon-btn small ${JSON.parse(localStorage.getItem("favorite")).photos.includes(id) && "active"}" data-favorite-btn>
                <div class="state-layer"></div>
                <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
            </button>
        </div>
        <a href="${window.location.origin}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
    `
    const cardBanner = card.querySelector("img");
    cardBanner.style.opacity = 0;
    cardBanner.addEventListener("load", (e) => {
        cardBanner.animate({ opacity: 1 }, { duration: 400, fill: "forwards" })
    });
    const favoriteBtn = card.querySelector("[data-favorite-btn]");
    favorite(favoriteBtn,"photos", id);
    return card;
}