import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data,id) => {
  const doc = new jsPDF();
  const tableColumn = ["Student ID", "Date", "Time"];
  const tableRows = [];

  data.forEach((row) => {
    const date = row.date_time.split("@");
    const insightData = [row.id,date[0],date[1]];
    tableRows.push(insightData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 30 });

  doc.text("Library Books Download Report. \nDownloads : "+data.length, 14, 15);
  doc.save(`insight_${id}.pdf`);
};

export default generatePDF;
