import { favorite } from "./favorite.js";
import { hoverOnPlay } from "./utils/hoverOnPlay.js";

export const videoCard = (video) => {
  const root = window.location.origin;
  const { height, width, id, image, video_files } = video;
  let sdVideo;
  for (let i = 0; i < video_files.length; i++) {
    if (video_files[i].quality === "sd") {
            sdVideo = video_files[i];
            break;
        }
    }
    const { file_type, link } = sdVideo;
    const card = document.createElement("div");
    card.classList.add("card","grid-item","video")
    card.innerHTML = `
                        <div class="card-banner" style="--width:${width};--height:${height}" >
                            <video poster="${image}"  muted loop preload="none" class="img-cover" data-video>
                                <source src="${link}" type="${file_type}">
                            </video>
                        </div>
                        <div class="card-content">
                            <button class="icon-btn small ${JSON.parse(localStorage.getItem("favorite")).videos.includes(id) && "active"}" data-favorite-btn>
                                <span class="material-symbols-outlined leading-icon " aria-hidden="true">favorite</span>
                                <div class="state-layer"></div>
                            </button>
                        </div>
                        <span class="card-badge" data-card-badge>
                            <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
                        </span>
                        <a href="${window.location.origin}/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>

    `
    const favoriteBtn = card.querySelector("[data-favorite-btn]");
    favorite(favoriteBtn, "photos", id);
    hoverOnPlay(card);
    return card;
};
