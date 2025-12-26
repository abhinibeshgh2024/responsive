let currentImage = "";

/* ===== DATA ===== */
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

/* ===== LOAD ===== */
function loadGallery(category) {
    const gallery = document.getElementById("gallery");
    document.getElementById("sectionTitle").innerText =
        category.toUpperCase();

    gallery.innerHTML = "";

    imageData[category].forEach(src => {
        gallery.innerHTML += `
            <div class="gallery-card">
                <img src="${src}">
                <div class="card-actions">
                    <button onclick="openModal('${src}')">View</button>
                    <button onclick="openModal('${src}')">Download</button>
                </div>
            </div>
        `;
    });
}

/* ===== MODAL ===== */
function openModal(src) {
    currentImage = src;
    document.getElementById("modalImg").src = src;
    document.getElementById("imageModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

/* ===== DOWNLOAD LOGIC ===== */
function downloadImage(type) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = currentImage;

    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);

        if (type === "png") {
            canvas.toBlob(b => saveFile(b, "GoGenix.png"), "image/png");
        }

        if (type === "jpg") {
            canvas.toBlob(b => saveFile(b, "GoGenix.jpg"), "image/jpeg", 0.95);
        }

        if (type === "pdf") {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: img.width > img.height ? "l" : "p",
                unit: "px",
                format: [img.width, img.height]
            });
            pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0);
            pdf.save("GoGenix.pdf");
        }
    };
}

/* ===== SAVE (PC + ANDROID) ===== */
function saveFile(blob, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* DEFAULT */
loadGallery("devotion");
