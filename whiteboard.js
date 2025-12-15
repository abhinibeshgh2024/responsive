const canvas=document.getElementById("board");
const ctx=canvas.getContext("2d");
canvas.width=3000; canvas.height=2000;

let tool="pen",drawing=false,color="#000",size=4;
let undoStack=[],redoStack=[];
let theme="light";

function saveState(){
  undoStack.push(canvas.toDataURL());
  redoStack=[];
}

function undo(){
  if(!undoStack.length)return;
  redoStack.push(canvas.toDataURL());
  let img=new Image();
  img.src=undoStack.pop();
  img.onload=()=>ctx.drawImage(img,0,0);
}

function redo(){
  if(!redoStack.length)return;
  undoStack.push(canvas.toDataURL());
  let img=new Image();
  img.src=redoStack.pop();
  img.onload=()=>ctx.drawImage(img,0,0);
}

canvas.addEventListener("mousedown",e=>{
  if(tool==="text")return createText(e);
  saveState();
  drawing=true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX,e.offsetY);
});
canvas.addEventListener("mousemove",e=>{
  if(!drawing)return;
  ctx.lineWidth=size;
  ctx.strokeStyle=color;
  ctx.lineTo(e.offsetX,e.offsetY);
  ctx.stroke();
});
canvas.addEventListener("mouseup",()=>drawing=false);

function setTool(t){tool=t}
colorPicker.oninput=e=>color=e.target.value;
sizePicker.oninput=e=>size=e.target.value;

/* TEXT SYSTEM */
function createText(e){
  const box=document.createElement("div");
  box.className="text-editor";
  box.contentEditable=true;
  box.style.left=e.offsetX+"px";
  box.style.top=e.offsetY+"px";

  const act=document.createElement("div");
  act.className="text-actions";
  act.innerHTML="✅ ❌";
  box.appendChild(act);

  act.children[0].onclick=()=>finalize(box);
  act.children[1].onclick=()=>box.remove();

  document.body.appendChild(box);
  box.focus();
}

function finalize(box){
  const text=box.innerText.replace("✅","").replace("❌","").trim();
  const fixed=document.createElement("div");
  fixed.className="fixed-text";
  fixed.innerText=text;
  fixed.style.left=box.style.left;
  fixed.style.top=box.style.top;

  fixed.onclick=()=>{
    box.innerText=text;
    document.body.appendChild(box);
    fixed.remove();
  };

  document.body.appendChild(fixed);
  box.remove();
}

/* THEME */
function toggleTheme(){
  theme=theme==="light"?"dark":"light";
  document.body.className=theme;
}

/* EXPORT */
function exportPNG(){
  const link=document.createElement("a");
  link.download="whiteboard.png";
  link.href=canvas.toDataURL();
  link.click();
}
