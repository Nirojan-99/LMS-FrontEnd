import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDF = (students, moduleId, Module) => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "type", "Name", "Faculty"];

  const tableRows = [];

  students.forEach((row) => {
    const insightData = [row.ID, row.type, row.name, row.faculty];

    tableRows.push(insightData);
  });

  Module.forEach((row1) => {
    const ModuleName = row1.Modulename;
    const ModuleCode = row1.ModuleCode;
    const EnrollmentsKey = row1.ModuleEnrollmentkey;

    doc.autoTable(tableColumn, tableRows, { startY: 50 }, { Theme: "grid" });

    doc.setFontSize(15);
    doc.text(
      "Enrollment Report\n\nTotalEnrollment : " +
        students.length +
        "\tModuleName :" +
        ModuleName +
        "\nModuleCode : " +
        ModuleCode +
        "\tModuleEnrollmentkey :" +
        EnrollmentsKey,
      25,
      15
    );

    doc.save(`enroll_insight_${moduleId}.pdf`);
  });
};

export default GeneratePDF;
