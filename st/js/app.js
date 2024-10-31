import { client } from "./api_configure.js"
import { updateGrid,initGrid } from "./utils/masonry_grid.js" 
import { photoCard } from "./photo_card.js" 
import { videoCard } from  "./video_card.js"
const photoGrid = document.querySelector("[data-photo-grid]");
photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(20);
client.photos.curated({ page: 1, per_page: 1 }, (data) => {
    photoGrid.innerHTML = "";
    const { columns, columnsHeight } = initGrid(photoGrid)
    data.photos.forEach(photo => {
        const $photoCard = photoCard(photo);
        updateGrid($photoCard, columnsHeight, columns);
    });
    const container = document.querySelector("[data-media-grid-container]");
    const buttonElement = document.createElement("div");
    buttonElement.classList.add("overlay-btn");
    buttonElement.innerHTML = `
                            <a href="./pages/photos/photos.html" class="btn btn-primary">
                                <span class="label-large text">Explore more</span>
                                <div class="state-layer"></div>
                            </a>`;
    container.appendChild(buttonElement);
})


// render popular videos in home page

const $videoGrid = document.querySelector("[data-video-grid]");
$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(20);
client.videos.popular({ per_page: 1 }, data => {
    $videoGrid.innerHTML = "";
    const videoGrid = initGrid($videoGrid);
    data.videos.forEach(video => {
        const $videoCard = videoCard(video);
        updateGrid($videoCard,videoGrid.columnsHeight,videoGrid.columns);
    })
})
