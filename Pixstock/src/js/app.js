import { client } from "./api_configure.js"
import { updateGrid,initGrid } from "./utils/masonry_grid.js" 
import { photoCard } from "./photo_card.js" 
import { videoCard } from "./video_card.js"
import { collectionCard } from "./collection_card.js"
const photoGrid = document.querySelector("[data-photo-grid]");
photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(20);
const photos = [];
client.photos.curated({ page: 1, per_page: 100 }, (data) => {
    photoGrid.innerHTML = "";
    const { columns, columnsHeight } = initGrid(photoGrid)
    data.photos.forEach(photo => {
        const $photoCard = photoCard(photo);
        updateGrid($photoCard, columnsHeight, columns);
        photos.push($photoCard);
    });
})


// render popular videos in home page

const $videoGrid = document.querySelector("[data-video-grid]");
$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(20);
const videos = [];
client.videos.popular({ per_page: 20 }, data => {
    $videoGrid.innerHTML = "";
    const videoGrid = initGrid($videoGrid);
    data.videos.forEach(video => {
        const $videoCard = videoCard(video);
        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.columns);
        videos.push($videoCard);
    })
    const container = document.querySelector("[data-media-grid-container]");
    const buttonElement = document.createElement("div");
    buttonElement.classList.add("overlay-btn");
    buttonElement.innerHTML = `
    <a href="#" class="btn btn-primary">
    <span class="label-large text">Explore more</span>
    <div class="state-layer"></div>
    </a>`;
    container.appendChild(buttonElement);
})

const container = document.querySelectorAll("[data-media-grid-container]");
container.forEach((container) => {
    const buttonElement = document.createElement("div");
    buttonElement.classList.add("overlay-btn");
    buttonElement.innerHTML = `
                            <a href="#" class="btn btn-primary">
                                <span class="label-large text">Explore more</span>
                                <div class="state-layer"></div>
                            </a>`;
    container.appendChild(buttonElement);
},)

const collectionGrid = document.querySelector("[data-collection-grid]");
client.collections.featured({ per_page: 100 }, (data) => {
    data.collections.forEach((collection) => {
        const $collectionCard = collectionCard(collection);
        collectionGrid.appendChild($collectionCard)
    })
})
window.addEventListener("resize", (e) => {
    const columns = document.querySelectorAll("[data-grid-column]");
    if (window.innerWidth >= 900 && columns.length < 6) {
        photoGrid.innerHTML = "";
        $videoGrid.innerHTML = ""
        const $photoGrid = initGrid(photoGrid);
        const videoGrid = initGrid($videoGrid);
        photos.forEach((photo) => {
            updateGrid(photo, $photoGrid.columnsHeight, $photoGrid.columns);
        })
        videos.forEach((video) => {
            updateGrid(video, videoGrid.columnsHeight, videoGrid.columns);
        })
    } else if (window.innerWidth < 900 && columns.length >= 6) {
        columns[columns.length - 1].remove();
        columns[columns.length - 4].remove();
    }
})