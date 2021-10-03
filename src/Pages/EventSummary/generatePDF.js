import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data) => {
  const doc = new jsPDF();
  const tableColumn = ["Event Name", "Event Date", "Created Date"];
  const tableRows = [];

  data.forEach((row) => {
    const insightData = [row.title, row.date, row.date_time];
    tableRows.push(insightData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  doc.text("Events Report ", 14, 15);
  doc.save(`Events_.pdf`);
};

export default generatePDF;
