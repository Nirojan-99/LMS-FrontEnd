import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data, id) => {
  const doc = new jsPDF();
  const tableColumn = ["Student Name", "Student ID", "Date", "Time"];
  const tableRows = [];

  data.forEach((row) => {
    const date = row.date_time.split("@");
    const insightData = [row.studentName, row.student, date[0], date[1]];
    tableRows.push(insightData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 30 });

  doc.text("Attandance Report ", 14, 15);
  doc.save(`Attandance_${id}.pdf`);
};

export default generatePDF;
