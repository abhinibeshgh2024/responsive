const imageData = {
    devotion: [
        "https://picsum.photos/id/1011/800/1200",
        "https://picsum.photos/id/1025/1200/800",
        "https://picsum.photos/id/1040/900/1300"
    ],
    nature: [
        "https://picsum.photos/id/1056/1200/800",
        "https://picsum.photos/id/1069/800/1200"
    ],
    environment: [
        "https://picsum.photos/id/1074/900/1200",
        "https://picsum.photos/id/1084/1200/800"
    ],
    monuments: [
        "https://picsum.photos/id/1081/800/1200",
        "https://picsum.photos/id/1031/1200/800"
    ]
};

function loadGallery(category) {
    const gallery = document.getElementById("gallery");
    const title = document.getElementById("sectionTitle");

    gallery.innerHTML = "";
    title.innerText =
        category.charAt(0).toUpperCase() + category.slice(1);

    imageData[category].forEach(src => {
        const card = document.createElement("div");
        card.className = "gallery-card";

        card.innerHTML = `
            <img src="${src}" alt="gallery image">
            <div class="download-bar">
                <a href="${src}" download>PNG</a>
                <a href="${src}" download>JPG</a>
                <a href="${src}" download>PDF</a>
            </div>
        `;

        gallery.appendChild(card);
    });

    window.scrollTo({ top: 140, behavior: "smooth" });
}

/* Default Load */
loadGallery("devotion");
