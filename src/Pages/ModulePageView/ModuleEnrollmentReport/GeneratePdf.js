import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = marks => {
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Subject", "Index Number", "Marks"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  marks.forEach(mark => {
    const markData = [
      mark._id,
      mark.subject,
      mark.indexNumber,
      mark.marks,
    ];
    // push each tickcet's info into a row
    tableRows.push(markData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Marks Data.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;