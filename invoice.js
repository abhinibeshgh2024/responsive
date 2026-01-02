let signType = "";

function selectSign(type) {
    document.getElementById("digitalSign").checked = false;
    document.getElementById("manualSign").checked = false;

    if (type === "digital") {
        document.getElementById("digitalSign").checked = true;
        signType = "digital";
    }

    if (type === "manual") {
        document.getElementById("manualSign").checked = true;
        signType = "manual";
    }
}

function addItem() {
    const div = document.createElement("div");
    div.className = "item-row";
    div.innerHTML = `
        <input class="item-name" placeholder="Item Name">
        <input class="item-qty" type="number" placeholder="Qty">
        <input class="item-price" type="number" placeholder="Price">
    `;
    document.getElementById("items").appendChild(div);
}

function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;

    const v = id => document.getElementById(id).value;

    const invoiceID = "INV-" + Date.now();

    /* ================= HEADER ================= */
    doc.setFontSize(20);
    doc.text(v("businessName"), 105, y, { align: "center" }); y += 8;

    doc.setFontSize(11);
    doc.text(v("businessAddress"), 105, y, { align: "center" }); y += 6;
    doc.text(
        `${v("businessEmail")} | ${v("businessPhone")}`,
        105, y, { align: "center" }
    );
    y += 10;

    doc.line(10, y, 200, y);
    y += 10;

    /* ================= INVOICE META ================= */
    doc.text(`Invoice ID: ${invoiceID}`, 10, y);
    doc.text(`Invoice Date: ${v("invoiceDate")}`, 140, y);
    y += 6;
    doc.text(`Due Date: ${v("dueDate")}`, 140, y);
    y += 10;

    /* ================= CLIENT ================= */
    doc.text("Bill To:", 10, y); y += 6;
    doc.text(v("clientName"), 10, y); y += 6;
    doc.text(v("clientAddress"), 10, y); y += 6;
    doc.text(v("clientEmail"), 10, y); y += 10;

    /* ================= ITEMS ================= */
    let total = 0;
    doc.text("Items:", 10, y);
    y += 6;

    document.querySelectorAll(".item-row").forEach(r => {
        const n = r.querySelector(".item-name").value;
        const q = Number(r.querySelector(".item-qty").value);
        const p = Number(r.querySelector(".item-price").value);
        const l = q * p;
        total += l;

        doc.text(`${n} | ${q} x ${p} = ${l}`, 10, y);
        y += 6;
    });

    /* ================= TOTAL ================= */
    const tax = Number(v("tax")) || 0;
    const disc = Number(v("discount")) || 0;

    const taxAmt = total * tax / 100;
    const discAmt = total * disc / 100;
    const grand = total + taxAmt - discAmt;

    y += 6;
    doc.text(`Subtotal: ${total}`, 10, y); y += 6;
    doc.text(`Tax (${tax}%): ${taxAmt}`, 10, y); y += 6;
    doc.text(`Discount (${disc}%): -${discAmt}`, 10, y); y += 6;

    doc.setFontSize(14);
    doc.text(`Grand Total: ${grand}`, 10, y);
    y += 10;

    /* ================= NOTES ================= */
    doc.setFontSize(11);
    doc.text("Notes:", 10, y); y += 6;
    doc.text(v("notes"), 10, y);
    y += 10;

    /* ================= QR DATA (SCANNABLE) ================= */
    const qrData = `
Invoice ID: ${invoiceID}
Business: ${v("businessName")}
Client: ${v("clientName")}
Invoice Date: ${v("invoiceDate")}
Due Date: ${v("dueDate")}
Amount: ${grand}
    `.trim();

    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        encodeURIComponent(qrData);

    doc.addImage(qrURL, "PNG", 150, y, 40, 40);
    y += 50;

    /* ================= SIGNATURE ================= */
    doc.line(10, y, 80, y);
    doc.text("Authorized Signature", 10, y + 5);

    if (signType === "digital") {
        doc.setTextColor(0, 150, 0);
        doc.setFontSize(18);
        doc.text("✔", 105, y + 10, { align: "center" });
        doc.text("DIGITALLY SIGNED", 105, y + 20, { align: "center" });
        doc.setTextColor(0, 0, 0);
    }

    if (signType === "manual") {
        doc.text("Sign Here", 10, y - 5);
    }

    doc.save(invoiceID + ".pdf");
}
