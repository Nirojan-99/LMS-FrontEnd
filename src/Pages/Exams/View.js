import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useSelector } from "react-redux";
import editIcon from "../../Assets/edit.svg";
import deleteIcon from "../../Assets/delete.svg";
import { Link } from "react-router-dom";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";

const ExamView = () => {
    const [exams, setExams] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const userType = useSelector((state) => state.loging.type);
    const [deleteExam, setDeleteExam] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("http://localhost:5000/exams/getAllExams")
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
            .delete(`http://localhost:5000/exams/deleteExam?ID=${deleteExam}`)
            .then((res) => {
                fetchData();
            })
            .catch((er) => {
                console.log("error");
            });
        setLoaded(true);
        setDeleteExam(false);
    };

    return (
        <div style={{ width: "85%", margin: "auto", minHeight: "50vh" }}>
            {(userType === "admin" || "student ") && loaded ? (
                <>
                    <div className="card_area">
                        {exams.map((exam, key) => (
                            <div key={key} className="card">
                                <div>
                                    <h4>Subject: {exam.name}</h4>
                                    <h4>Professor: {exam.professor}</h4>
                                    <h4>Start Date: {exam.startDate}</h4>
                                    <h4>End Date: {exam.endDate}</h4>
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    {userType === "admin" && (
                                        <>
                                            <Link to={`/services/exams/edit/${exam._id}`}>
                                                <img src={editIcon} className="customLink" />
                                            </Link>
                                            <div onClick={() => setDeleteExam(exam._id)} style={{ marginLeft: 10 }}>
                                                <img src={deleteIcon} className="customLink" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center", marginBottom: 30 }}>
                        {userType === "admin" && (
                            <Link to="/services/exams/new">
                                <button className="custom_button">Add New Exam</button>
                            </Link>
                        )}
                    </div>
                </>
            ) : null}

            {!loaded && (
                <div style={{ display: "grid", placeItems: "center" }}>
                    <Loader />
                </div>
            )}

            {deleteExam && <DeletePopup hide={() => setDeleteExam(false)} onDelete={handleDelete} />}
        </div>
    );
};
export default ExamView;
