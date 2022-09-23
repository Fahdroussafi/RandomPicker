const objectToCsv = function (data) {
  const csvRows = [];

  // get the headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  // console.log(csvRows);

  // loop over the rows
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
};

const download = function (data) {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "report.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const getReport = async () => {
  const jsonUrl = "http://localhost:3000/elements";
  const res = await fetch(jsonUrl);
  const json = await res.json();

  const data = json.map((row) => ({
    fullName: row.fullName,
    subject: row.subject,
    date: row.date,
  }));

  const csvData = objectToCsv(data);
  download(csvData);
};

// button click
const button = document.getElementById("export");
button.addEventListener("click", getReport);
