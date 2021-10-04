import jsPDF from "jspdf";
import "jspdf-autotable";


const generateUserReport = (users) => {
    const doc=new jsPDF();

    // define the columns we want and their titles
  const tableColumn = ["UserID", "Name", "UserRole", "Faculty", "Email", "ContactNo"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  users.forEach(user => {
    const userData = [
     user.ID,
     user.name,
     user.type,
     user.faculty,
     user.email,
     user.contact

    ];
    // push each tickcet's info into a row
    tableRows.push(userData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {startY: 20, theme: 'grid'});
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[3]+ "-"+ date[1] +"-"+ date[2] ;
  // ticket title. and margin-top + margin-left
  doc.text("All LMS User", 14, 15);
  // we define the name of our PDF file.
  doc.save(`LmsUserReport_${dateStr}.pdf`);

    
};

export default generateUserReport;
