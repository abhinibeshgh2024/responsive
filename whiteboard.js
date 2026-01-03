const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let drawing = false;
let erase = false;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const penColor = document.getElementById('penColor');
const penSize = document.getElementById('penSize');
const penType = document.getElementById('penType');
const mediaInput = document.getElementById('mediaInput');

canvas.addEventListener('mousedown', e => { drawing = true; draw(e); });
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mouseout', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

function draw(e){
  if(!drawing) return;
  ctx.lineWidth = penSize.value;
  ctx.lineCap = penType.value;
  ctx.strokeStyle = erase ? '#ffffff' : penColor.value;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function eraseMode(){ erase = !erase; }

function clearCanvas(){ ctx.clearRect(0,0,canvas.width,canvas.height); }

function downloadCanvas(){
  const link = document.createElement('a');
  link.download = 'whiteboard.png';
  link.href = canvas.toDataURL();
  link.click();
}

// INSERT MEDIA
mediaInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);

  if(file.type.startsWith('image')){
    const img = new Image();
    img.onload = ()=> ctx.drawImage(img,50,50,img.width/2,img.height/2);
    img.src = url;
  } else if(file.type.startsWith('video')){
    const vid = document.createElement('video');
    vid.src = url;
    vid.muted = true;
    vid.play();
    vid.onplay = ()=>{
      ctx.drawImage(vid,50,50,vid.videoWidth/2, vid.videoHeight/2);
    }
  }
});
