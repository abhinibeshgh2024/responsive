const headingColor = document.getElementById("headingColor");
const textColor = document.getElementById("textColor");
const themeSelect = document.getElementById("themeSelect");

headingColor.oninput = () =>
  document.documentElement.style.setProperty("--headingColor", headingColor.value);

textColor.oninput = () =>
  document.getElementById("resume").style.color = textColor.value;

themeSelect.onchange = () => {
  const val = themeSelect.value;
  if(val==="corporate") document.body.style.background = "linear-gradient(135deg,#5d3fd3,#1e3a8a)";
  else if(val==="academic") document.body.style.background = "linear-gradient(135deg,#2a5298,#1e3a8a)";
  else if(val==="creative") document.body.style.background = "linear-gradient(135deg,#ff512f,#dd2476)";
}

function previewPhoto(e) {
  const img = document.getElementById("profile-pic");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
}

function p(id, html) { document.getElementById(id).innerHTML += html; }

function addEducation() {
  p("p-education", `<li><b>${eduInstitute.value}</b>, ${eduCourse.value} – ${eduCity.value} (${eduBatch.value})</li>`);
  ["eduInstitute","eduCourse","eduCity","eduBatch"].forEach(i=>document.getElementById(i).value="");
}
function addExperience() {
  p("p-experience", `<li><b>${expCompany.value}</b> – ${expRole.value} (${expDuration.value})<br>${expDesc.value}</li>`);
  ["expCompany","expRole","expDuration","expDesc"].forEach(i=>document.getElementById(i).value="");
}
function addSkill() { p("p-skills", `<li>${skillInput.value}</li>`); skillInput.value=""; }
function addProject() { p("p-projects", `<li><b>${projTitle.value}</b>: ${projDesc.value}</li>`); projTitle.value=""; projDesc.value=""; }
function addPublication() { p("p-publications", `<li><b>${pubTitle.value}</b>, ${pubJournal.value}, ${pubVolume.value}</li>`); pubTitle.value=""; pubJournal.value=""; pubVolume.value=""; }
function addCertification() { p("p-certifications", `<li><b>${certName.value}</b>, ${certOrg.value}, ${certYear.value}</li>`); certName.value=""; certOrg.value=""; certYear.value=""; }

["name","email","phone"].forEach(id=>{
  document.getElementById(id).oninput=()=>{
    document.getElementById("p-"+id).innerText = document.getElementById(id).value;
  }
});

function downloadPDF() { window.print(); }
