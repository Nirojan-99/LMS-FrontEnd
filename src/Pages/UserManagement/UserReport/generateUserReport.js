import jsPDF from "jspdf";
import "jspdf-autotable";

const generateUserReport = (users, allTypeUsers) => {
  const computingUsers = allTypeUsers.computingUsers;
  const enginneringUsers = allTypeUsers.enginneringUsers;
  const bussinessUsers = allTypeUsers.bussinessUsers;
  const HumSciUsers = allTypeUsers.HumSciUsers;

  const doc = new jsPDF();

  // colums
  const tableColumn = [
    "UserID",
    "Name",
    "UserRole",
    "Faculty",
    "Email",
    "ContactNo",
  ];
  // array
  const tableRows = [];

  users.forEach((user) => {
    const userData = [
      user.ID,
      user.name,
      user.type,
      user.faculty,
      user.email,
      user.contact,
    ];
    // push data
    tableRows.push(userData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 60, theme: "grid" });
  const date = Date().split(" ");

  const dateStr = date[3] + "-" + date[1] + "-" + date[2];

  doc.setFontSize(20);
  doc.text("All LMS User", 80, 15);
  doc.setFontSize(10);
  doc.text(
    "\n\n TOTAL USERS : " +
      users.length +
      "\n\n COMPUTING USERS : " +
      computingUsers.length +
      "\n\n ENGINNERING USERS : " +
      enginneringUsers.length +
      "\n\n BUSSINESS USERS : " +
      bussinessUsers.length +
      "\n\n HUMANITIES & SCIENCE USERS : " +
      HumSciUsers.length,
    13,
    15
  );

  doc.save(`LmsUserReport_${dateStr}.pdf`);
};

export default generateUserReport;
