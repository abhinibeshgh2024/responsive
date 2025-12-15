const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const container = document.getElementById("boardContainer");

canvas.width = 3500;
canvas.height = 2200;

let tool = "pen";
let drawing = false;
let color = "#1a73e8";
let size = 4;
let dark = false;

function setTool(t) {
  tool = t;
}

function toggleMode() {
  dark = !dark;
  document.body.className = dark ? "dark" : "light";
}

document.getElementById("colorPicker").oninput = e => color = e.target.value;
document.getElementById("sizePicker").oninput = e => size = e.target.value;

// DRAWING
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => drawing = false);

function startDraw(e) {
  if (tool === "text") return createTextBox(e);
  drawing = true;
  ctx.beginPath();
  const p = getPos(e);
  ctx.moveTo(p.x, p.y);
}

function draw(e) {
  if (!drawing) return;
  const p = getPos(e);

  ctx.strokeStyle = color;

  if (tool === "marker") {
    ctx.globalAlpha = 1;
    ctx.lineWidth = size * 2;
  } 
  else if (tool === "highlighter") {
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = size * 4;
  } 
  else if (tool === "eraser") {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = dark ? "#000" : "#fff";
    ctx.lineWidth = size * 3;
  } 
  else {
    ctx.globalAlpha = 1;
    ctx.lineWidth = size;
  }

  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

// TEXT
function createTextBox(e) {
  const box = document.createElement("div");
  box.className = "text-box";
  box.contentEditable = true;
  box.innerText = "Type here";
  box.style.left = e.clientX + "px";
  box.style.top = e.clientY + "px";
  makeDraggable(box);
  container.appendChild(box);
}

// IMAGE
function addImage(e) {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.className = "img-box";
  img.style.width = "250px";
  img.style.left = "100px";
  img.style.top = "100px";
  makeDraggable(img);
  container.appendChild(img);
}

// DRAG
function makeDraggable(el) {
  let ox, oy;
  el.onmousedown = ev => {
    ox = ev.offsetX;
    oy = ev.offsetY;
    document.onmousemove = mv => {
      el.style.left = mv.pageX - ox + "px";
      el.style.top = mv.pageY - oy + "px";
    };
    document.onmouseup = () => document.onmousemove = null;
  };
}

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

