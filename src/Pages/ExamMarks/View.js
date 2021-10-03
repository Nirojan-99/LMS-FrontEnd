import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useSelector } from "react-redux";
import editIcon from "../../Assets/edit.svg";
import deleteIcon from "../../Assets/delete.svg";
import { Link } from "react-router-dom";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import generatePDF from "./generatePDF";

const ExamViewMark = () => {
    const [exams, setExams] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const userType = useSelector((state) => state.loging.type);
    const [deleteMark, setDeleteMark] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("http://localhost:5000/exMarks/getAllExamMarks")
            .then((res) => {
                setExams(res.data);
                setLoaded(true);
            })
            .catch((er) => {
                console.log("error");
            });
    };

    const handleDelete = () => {
        setLoaded(false);
        axios
            .delete(`http://localhost:5000/exMarks/deleteExamMark?ID=${deleteMark}`)
            .then((res) => {
                fetchData();
            })
            .catch((er) => {
                console.log("error");
            });
        setLoaded(true);
        setDeleteMark(false);
    };

    return (
        <div style={{ width: "85%", margin: "auto", minHeight: "50vh", paddingTop: 20 }}>
            {(userType === "admin" || "student ") && loaded ? (
                <>
                    <table style={{ background: "white", width: "100%" }}>
                        <thead>
                            <tr style={{ height: 50, background: "#e5e4e4" }}>
                                <td>Id</td>
                                <td align="center">Subject</td>
                                <td align="center">Index Number</td>
                                <td align="center">Marks</td>
                                {userType === "admin" && <td align="center">Action</td>}
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam) => (
                                <tr key={exam.id} style={{ height: 40 }}>
                                    <td>{exam._id}</td>
                                    <td align="center">{exam.subject}</td>
                                    <td align="center">{exam.indexNumber}</td>
                                    <td align="center">{exam.marks}</td>
                                    {userType === "admin" && (
                                        <td align="center">
                                            <Link to={`/services/exam_marks/edit/${exam._id}`}>
                                                <img src={editIcon} width={20} />
                                            </Link>
                                            <img
                                                onClick={() => setDeleteMark(exam._id)}
                                                src={deleteIcon}
                                                style={{ marginLeft: 20 }}
                                                width={20}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {userType === "admin" && (
                        <div style={{ textAlign: "center", marginBottom: 30, marginTop: 20 }}>
                            <Link to="/services/exam_marks/new">
                                <button className="custom_button">Add New Exam Marks</button>
                            </Link>
                            <button onClick={() => generatePDF(exams)} className="custom_button" style={{ marginLeft: 20 }}>
                                Download as PDF
                            </button>
                        </div>
                    )}
                </>
            ) : null}

            {!loaded && (
                <div style={{ display: "grid", placeItems: "center" }}>
                    <Loader />
                </div>
            )}

            {deleteMark && <DeletePopup hide={() => setDeleteMark(false)} onDelete={handleDelete} />}
        </div>
    );
};
export default ExamViewMark;
