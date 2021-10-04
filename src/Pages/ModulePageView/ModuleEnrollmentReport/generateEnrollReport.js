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
    const LectureInCharage = row1.ModuleLectureIncharge;

    doc.autoTable(tableColumn, tableRows, { startY: 100, theme: "grid" });
    doc.setFontSize(21);
    doc.text(13, 15, ModuleName+" Enrollment Report");
    doc.setFontSize(15);
    doc.text(
      "\n\n\n\nTotalEnrollment :: " +
        students.length +
        "\n\nModuleName ::" +
        ModuleName +
        "\n\nModuleCode :: " +
        ModuleCode +
        "\n\nModuleEnrollmentkey :: " +
        EnrollmentsKey +
        "\n\nLectureInCharage :: " +
        LectureInCharage.toUpperCase(),
      13,
      15
    );

    doc.save(`enroll_insight_${moduleId}.pdf`);
  });
};

export default GeneratePDF;
