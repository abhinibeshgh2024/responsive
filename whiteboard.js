const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Variables
let painting = false;
let brushColor = '#000000';
let brushSize = 5;
let isErasing = false;

// Functions
function startPainting(e) {
    painting = true;
    draw(e);
}

function stopPainting() {
    painting = false;
    ctx.beginPath();  // End the current path
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : brushColor;

    // Get the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Event Listeners for buttons and tools
document.getElementById('penButton').addEventListener('click', () => {
    isErasing = false;
});

document.getElementById('eraserButton').addEventListener('click', () => {
    isErasing = true;
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
    brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Mouse events on the canvas
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchend', () => {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});
