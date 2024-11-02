export const collectionCard = (collection) => {
    const collectionCard = document.createElement("div");
    collectionCard.classList.add("grid-item","list-item","two-line");
    collectionCard.setAttribute("data-collection-grid","");
    collectionCard.innerHTML = `
                            <div>
                                <h3 class="body-large">${collection.title}</h3>
                                <p class="body-medium label">${collection.media_count} media</p>
                            </div>
                            <a href="${window.location.origin}/pages/collections/collection_detail.html?collectionId=${collection.id}&title=${collection.title}" class="state-layer"></a>
    `
    return collectionCard;
}