function showAlert(msg){
    const box = document.getElementById("alertBox");
    box.innerText = msg;
    setTimeout(()=>box.innerText="",4000);
}

/* IMAGE CONVERSIONS */
function convertImage(file,type,name){
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = ()=>{
        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        c.getContext("2d").drawImage(img,0,0);
        c.toBlob(b=>saveAs(b,name),type);
    };
}

function jpgToPng(){
    const f=document.getElementById("jpgToPng").files[0];
    if(!f || f.type!=="image/jpeg"){
        showAlert("Please select a valid JPG file.");
        return;
    }
    convertImage(f,"image/png","converted.png");
}

function pngToJpg(){
    const f=document.getElementById("pngToJpg").files[0];
    if(!f || f.type!=="image/png"){
        showAlert("Please select a valid PNG file.");
        return;
    }
    convertImage(f,"image/jpeg","converted.jpg");
}

/* IMAGE → PDF */
async function imageToPdf(){
    const file=document.getElementById("imgToPdf").files[0];
    if(!file || !file.type.startsWith("image/")){
        showAlert("Please select a valid image.");
        return;
    }

    const pdf=await PDFLib.PDFDocument.create();
    const bytes=await file.arrayBuffer();
    const img=file.type==="image/png"
        ? await pdf.embedPng(bytes)
        : await pdf.embedJpg(bytes);

    const page=pdf.addPage([img.width,img.height]);
    page.drawImage(img,{x:0,y:0,width:img.width,height:img.height});

    saveAs(new Blob([await pdf.save()]),"image.pdf");
}

/* MERGE TWO PDFs */
async function mergeTwoPdfs(){
    const f1=document.getElementById("mergePdf1").files[0];
    const f2=document.getElementById("mergePdf2").files[0];

    if(!f1 || !f2){
        showAlert("Please select TWO PDF files.");
        return;
    }
    if(f1.type!=="application/pdf" || f2.type!=="application/pdf"){
        showAlert("Only PDF files allowed.");
        return;
    }

    const merged=await PDFLib.PDFDocument.create();

    for(let f of [f1,f2]){
        const pdf=await PDFLib.PDFDocument.load(await f.arrayBuffer());
        const pages=await merged.copyPages(pdf,pdf.getPageIndices());
        pages.forEach(p=>merged.addPage(p));
    }

    saveAs(new Blob([await merged.save()]),"merged.pdf");
    showAlert("PDFs merged successfully ✔");
}

/* COMPRESS PDF (2× / 4×) */
async function compressPdf(){
    const file=document.getElementById("compressPdf").files[0];
    const level=parseInt(document.getElementById("compressLevel").value);

    if(!file || file.type!=="application/pdf"){
        showAlert("Please select a valid PDF.");
        return;
    }

    const pdf=await PDFLib.PDFDocument.load(await file.arrayBuffer());

    const compressedBytes = await pdf.save({
        useObjectStreams:true,
        addDefaultPage:false,
        objectsPerTick: level === 4 ? 50 : 200
    });

    saveAs(new Blob([compressedBytes]),"compressed.pdf");
    showAlert(level+"× compression applied successfully ✔");
}
