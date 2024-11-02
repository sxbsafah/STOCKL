export const collectionCard = (collection) => {
    const collectionGrid = document.createElement("div");
    collectionGrid.classList.add("collection-grid");
    collectionGrid.setAttribute("data-collection-grid","");
    collectionGrid.innerHTML = `
                        <div class="grid-card list-item two-line">
                            <div>
                                <h3 class="body-large">${collection.title}</h3>
                                <p class="body-medium label">${collection.media_count} media</p>
                            </div>
                            <a href="${window.location.origin}/pages/collections/collection_detail.html?collectionId=${collection.id}&title=${collection.title}" class="state-layer"></a>
                        </div>
    `
    return collectionGrid;
}