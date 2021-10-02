import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function NewExamMark() {
    const history = useHistory();
    const [exam, setExam] = useState([]);
    const [values, setValues] = useState({
        subject: "",
        indexNumber: "",
        marks: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:5000/exams/getAllExams")
            .then((res) => {
                setExam(res.data);
                setValues({ ...values, subject: res.data[0].name });
            })
            .catch((er) => {
                console.log("error");
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:5000/exMarks/newExamMark", values)
            .then((res) => {
                history.push("/services/exam_marks");
            })
            .catch((er) => {
                console.log("error");
            });
    };

    return (
        <div
            style={{
                width: "85%",
                margin: "50px auto",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                minHeight: "50vh",
            }}
        >
            <form onSubmit={handleSubmit} className="custom_form">
                <h2>Add Mark</h2>
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Choose Subject</div>
                <select
                    style={{ width: "72%" }}
                    className="form_control"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                >
                    {exam.map((exam) => (
                        <option key={exam._id} value={exam.name}>
                            {exam.name}
                        </option>
                    ))}
                </select>
                <br />
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Index Number</div>
                <input
                    value={values.indexNumber}
                    required
                    name="indexNumber"
                    onChange={handleChange}
                    className="form_control"
                    type="number"
                    placeholder="Index Number"
                />
                <br />
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Marks</div>
                <input
                    value={values.marks}
                    required
                    name="marks"
                    onChange={handleChange}
                    className="form_control"
                    type="number"
                    placeholder="Marks"
                />
                <br />
                <button type="submit" style={{ marginTop: 15 }} className="custom_button">
                    Add Mark
                </button>
            </form>
        </div>
    );
}

export default NewExamMark;
