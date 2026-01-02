async function jpgToPng(){
    const file = document.getElementById("jpgInput").files[0];
    if(!file){
        alert("Please select a JPG file");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0);

        canvas.toBlob(blob=>{
            saveAs(blob,"converted.png");
        });
    };
}

async function jpgToPdf(){
    const file = document.getElementById("jpgPdfInput").files[0];
    if(!file){
        alert("Please select an image");
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.create();
    const imgBytes = await file.arrayBuffer();
    const image = await pdfDoc.embedJpg(imgBytes);

    const page = pdfDoc.addPage([image.width,image.height]);
    page.drawImage(image,{
        x:0,y:0,
        width:image.width,
        height:image.height
    });

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes]),"image.pdf");
}

async function mergePdf(){
    const files = document.getElementById("mergePdfInput").files;
    if(files.length < 2){
        alert("Select at least 2 PDF files");
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();

    for(let file of files){
        const bytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf,pdf.getPageIndices());
        pages.forEach(p=>mergedPdf.addPage(p));
    }

    const mergedBytes = await mergedPdf.save();
    saveAs(new Blob([mergedBytes]),"merged.pdf");
}

async function compressPdf(){
    const file = document.getElementById("compressPdfInput").files[0];
    if(!file){
        alert("Please select a PDF");
        return;
    }

    const pdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const bytes = await pdf.save({useObjectStreams:true});
    saveAs(new Blob([bytes]),"compressed.pdf");
}
