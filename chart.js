let chart;
const rowsDiv = document.getElementById("dataRows");
const errorBox = document.getElementById("error");

addRow();

function addRow() {
  const row = document.createElement("div");
  row.className = "data-row";
  row.innerHTML = `
    <input type="text" placeholder="Label">
    <input type="number" placeholder="Value">
    <input type="color" value="#2563eb">
  `;
  rowsDiv.appendChild(row);
}

function generateChart() {
  errorBox.textContent = "";

  const labels = [];
  const data = [];
  const colors = [];

  document.querySelectorAll(".data-row").forEach(r => {
    const label = r.children[0].value;
    const value = r.children[1].value;
    const color = r.children[2].value;

    if (label && value) {
      labels.push(label);
      data.push(Number(value));
      colors.push(color);
    }
  });

  if (!data.length) {
    errorBox.textContent = "Please add valid data rows.";
    return;
  }

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas, {
    type: chartType.value,
    data: {
      labels,
      datasets: [{
        label: chartTitle.value || "Dataset",
        data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: chartTitle.value
        }
      }
    }
  });
}

function exportPDF() {
  window.print();
}

