let chart;
const dataTable = document.getElementById("dataTable");
const errorBox = document.getElementById("error");

addRow(); // initial row

function addRow() {
  const row = document.createElement("div");
  row.className = "data-row";
  row.innerHTML = `
    <input type="text" placeholder="Label">
    <input type="number" placeholder="Value">
  `;
  dataTable.appendChild(row);
}

function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
}

function generateChart() {
  errorBox.textContent = "";

  const title = document.getElementById("chartTitle").value;
  const type = document.getElementById("chartType").value;
  const rows = document.querySelectorAll(".data-row");

  let labels = [];
  let values = [];

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    if (inputs[0].value && inputs[1].value) {
      labels.push(inputs[0].value);
      values.push(Number(inputs[1].value));
    }
  });

  if (labels.length === 0) {
    errorBox.textContent = "Please enter at least one valid data row.";
    return;
  }

  const colors = generateColors(values.length);

  if (chart) chart.destroy();

  const ctx = document.getElementById("chartCanvas").getContext("2d");
  chart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: title || "Dataset",
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: !!title,
          text: title
        }
      }
    }
  });
}
