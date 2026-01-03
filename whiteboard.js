const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let tool = "pen";
let shape = null;
let drawing = false;
let startX, startY;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");

function setTool(t) {
    tool = t;
    shape = null;
}

function setShape(s) {
    shape = s;
    tool = "shape";
}

canvas.addEventListener("pointerdown", (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;

    if (tool === "pen" || tool === "marker") {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = tool === "marker" ? sizePicker.value * 2 : sizePicker.value;
        ctx.lineCap = "round";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = sizePicker.value * 2;
        ctx.lineCap = "round";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener("pointerup", (e) => {
    if (!drawing) return;
    drawing = false;

    if (tool === "shape" && shape) {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = sizePicker.value;

        const endX = e.offsetX;
        const endY = e.offsetY;

        if (shape === "line") {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        if (shape === "rect") {
            ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        }

        if (shape === "circle") {
            const radius = Math.hypot(endX - startX, endY - startY);
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    ctx.beginPath();
});

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function insertImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 50, 50, img.width / 2, img.height / 2);
    };
    img.src = URL.createObjectURL(file);
}
