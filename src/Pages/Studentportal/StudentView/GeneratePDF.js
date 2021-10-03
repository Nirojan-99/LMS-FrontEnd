import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data,id,student) => {
  const doc = new jsPDF();
  const tableColumn = ["Semester", "Status", "GPA"];
  const tableRows = [];

  data.forEach((row) => {
    const insightData = [`Year ${row.year} semester ${row.semester}`,row.status,row.GPA];
    tableRows.push(insightData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 30 });

  doc.text("RESULTS of "+student.name+"\n"+student.ID, 14, 15);
  doc.save(`GPA_${id}.pdf`);
};

export default generatePDF;
