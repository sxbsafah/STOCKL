export const hoverOnPlay = (card) => {
    const cardVideo = card.querySelector("[data-video]");
    const cardBadge = card.querySelector("[data-card-badge]");
    let isPlaying = false;
    let playTimeout;
    card.addEventListener("pointerover", () => {
        playTimeout = setTimeout(async () => {
            cardBadge.style.display = "none";
            try {
                await cardVideo.play();
                isPlaying = true;
            } catch {
                isPlaying = false;
            }
        }, 500)
    });
    card.addEventListener("pointerout", () => {
        cardBadge.style.display = "flex";
        if (isPlaying) {
            cardVideo.pause();
        } else {
            clearTimeout(playTimeout);
        }
    })
}