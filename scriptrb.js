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

// ROW MANAGEMENT FUNCTIONS
function createInputRow(sectionId, rowHTML){
  const div = document.createElement("div");
  div.className = "row-input";
  div.innerHTML = rowHTML;
  document.getElementById(sectionId).appendChild(div);
}

function addRow(sectionId, previewId, rowClass, formatFunc){
  const rows = document.getElementById(sectionId).getElementsByClassName("row-input");
  Array.from(rows).forEach(row=>{
    const inputs = row.querySelectorAll("input,textarea");
    const data = Array.from(inputs).map(i=>i.value).filter(Boolean);
    if(data.length){
      document.getElementById(previewId).innerHTML += `<li>${formatFunc(data)}</li>`;
    }
  });
}

// EDUCATION
function addEducationRow(){
  createInputRow("edu-section", `<input placeholder="Institute"><input placeholder="Course / Degree"><input placeholder="City"><input placeholder="Batch (e.g. 2021–2025)">
    <button onclick="this.parentElement.remove()">Remove</button>`);
  addRow("edu-section","p-education","edu-row",d=>`<b>${d[0]}</b>, ${d[1]} – ${d[2]} (${d[3]})`);
}

// EXPERIENCE
function addExperienceRow(){
  createInputRow("exp-section", `<input placeholder="Company Name"><input placeholder="Role / Position"><input placeholder="Duration"><textarea placeholder="Work Description"></textarea><button onclick="this.parentElement.remove()">Remove</button>`);
  addRow("exp-section","p-experience","exp-row",d=>`<b>${d[0]}</b> – ${d[1]} (${d[2]})<br>${d[3]}`);
}

// SKILLS
function addSkillRow(){
  createInputRow("skill-section", `<input placeholder="Skill"><button onclick="this.parentElement.remove()">Remove</button>`);
  addRow("skill-section","p-skills","skill-row",d=>d[0]);
}

// PROJECTS
function addProjectRow(){
  createInputRow("proj-section", `<input placeholder="Project Title"><textarea placeholder="Project Description"></textarea><button onclick="this.parentElement.remove()">Remove</button>`);
  addRow("proj-section","p-projects","proj-row",d=>`<b>${d[0]}</b>: ${d[1]}`);
}

// PUBLICATIONS
function addPublicationRow(){
  createInputRow("pub-section", `<input placeholder="Paper Title"><input placeholder="Journal Name"><input placeholder="Volume / Issue / Year"><button onclick="this.parentElement.remove()">Remove</button>`);
  addRow("pub-section","p-publications","pub-row",d=>`<b>${d[0]}</b>, ${d[1]}, ${d[2]}`);
}

// CERTIFICATIONS
function addCertificationRow(){
  createInputRow("cert-section", `<input placeholder="Certificate Name"><input placeholder="Organization"><input placeholder="Year"><button onclick="this.parentElement.remove()">Remove</button>`);
  addRow("cert-section","p-certifications","cert-row",d=>`<b>${d[0]}</b>, ${d[1]}, ${d[2]}`);
}

// COVER LETTER
function generateCoverLetter(){
  const name=document.getElementById("name").value||"Your Name";
  const role=document.getElementById("coverRole").value||"Position";
  const company=document.getElementById("coverCompany").value||"Company";
  const email=document.getElementById("email").value;
  const phone=document.getElementById("phone").value;
  const letter=`Dear Hiring Manager,

My name is ${name}, and I am excited to apply for the ${role} role at ${company}. I have relevant experience and skills that align with your organization's needs.

Please contact me at ${email} or ${phone}.

Sincerely,
${name}`;
  document.getElementById("generated-letter").textContent=letter;
  document.getElementById("cover-letter-preview").style.display="block";
}

// DOWNLOAD PDF
function downloadPDF(){ window.print(); }
