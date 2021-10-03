import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data,id) => {
  const doc = new jsPDF();
  const tableColumn = ["Student ID", "Date", "Time"];
  const tableRows = [];

  data.forEach((row) => {
    const date = row.date_time.split("@");
    const insightData = [row.student,date[0],date[1]];
    tableRows.push(insightData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  doc.text("Material Access Insight.", 14, 15);
  doc.save(`insight_${id}.pdf`);
};

export default generatePDF;
