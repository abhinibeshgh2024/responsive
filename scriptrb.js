// COLOR PALETTE
const headingColor = document.getElementById("headingColor");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");

headingColor.oninput = () => document.documentElement.style.setProperty("--headingColor", headingColor.value);
textColor.oninput = () => document.getElementById("resume").style.color = textColor.value;
bgColor.oninput = () => document.getElementById("resume").style.backgroundColor = bgColor.value;

// PROFILE PHOTO
function previewPhoto(e){
  const img = document.getElementById("profile-pic");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
}

// UPDATE BASIC DETAILS
["name","email","phone"].forEach(id=>{
  document.getElementById(id).oninput=()=>{
    document.getElementById("p-"+id).innerText=document.getElementById(id).value;
  }
});

// FUNCTION TO CREATE ROWS WITH LINKED PREVIEW
function createInputRow(sectionId, previewId, rowHTML, formatFunc){
  const div = document.createElement("div");
  div.className = "row-input";
  div.innerHTML = rowHTML;
  
  const previewUl = document.getElementById(previewId);
  
  // create corresponding preview li
  const li = document.createElement("li");
  li.innerHTML = formatFunc(Array.from(div.querySelectorAll("input,textarea")).map(i=>i.value).filter(Boolean));
  previewUl.appendChild(li);

  // attach input events to update preview live
  div.querySelectorAll("input,textarea").forEach(inp=>{
    inp.oninput = ()=>{
      const data = Array.from(div.querySelectorAll("input,textarea")).map(i=>i.value).filter(Boolean);
      li.innerHTML = formatFunc(data);
    }
  });

  // REMOVE button to delete input row AND preview li
  div.querySelector("button").onclick = ()=>{
    previewUl.removeChild(li);
    div.remove();
  };

  document.getElementById(sectionId).appendChild(div);
}

// EDUCATION
function addEducationRow(){
  createInputRow("edu-section","p-education",
    `<input placeholder="Institute"><input placeholder="Course / Degree"><input placeholder="City"><input placeholder="Batch (e.g. 2021–2025)">
     <button>Remove</button>`,
    d=>`<b>${d[0]}</b>, ${d[1]} – ${d[2]} (${d[3]})`);
}

// EXPERIENCE
function addExperienceRow(){
  createInputRow("exp-section","p-experience",
    `<input placeholder="Company Name"><input placeholder="Role / Position"><input placeholder="Duration"><textarea placeholder="Work Description"></textarea><button>Remove</button>`,
    d=>`<b>${d[0]}</b> – ${d[1]} (${d[2]})<br>${d[3]}`);
}

// SKILLS
function addSkillRow(){
  createInputRow("skill-section","p-skills",
    `<input placeholder="Skill"><button>Remove</button>`,
    d=>d[0]);
}

// PROJECTS
function addProjectRow(){
  createInputRow("proj-section","p-projects",
    `<input placeholder="Project Title"><textarea placeholder="Project Description"></textarea><button>Remove</button>`,
    d=>`<b>${d[0]}</b>: ${d[1]}`);
}

// PUBLICATIONS
function addPublicationRow(){
  createInputRow("pub-section","p-publications",
    `<input placeholder="Paper Title"><input placeholder="Journal Name"><input placeholder="Volume / Issue / Year"><button>Remove</button>`,
    d=>`<b>${d[0]}</b>, ${d[1]}, ${d[2]}`);
}

// CERTIFICATIONS
function addCertificationRow(){
  createInputRow("cert-section","p-certifications",
    `<input placeholder="Certificate Name"><input placeholder="Organization"><input placeholder="Year"><button>Remove</button>`,
    d=>`<b>${d[0]}</b>, ${d[1]}, ${d[2]}`);
}

// DOWNLOAD PDF
function downloadPDF(){ window.print(); }
