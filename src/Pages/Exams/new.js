import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

function NewExam() {
    const history = useHistory();
    const [values, setValues] = useState({
        name: "",
        professor: "",
        startDate: "",
        endDate: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:5000/exams/newExam", values)
            .then((res) => {
                history.push("/services/exams");
            })
            .catch((er) => {
                console.log("error");
            });
    }

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
                <h2>Add New Exam</h2>
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Exam Name</div>
                <input value={values.name} required name="name" onChange={handleChange} className="form_control" type="text" placeholder="Exam Name" />
                <br />
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Proffessor Name</div>
                <input value={values.professor} required name="professor" onChange={handleChange} className="form_control" type="text" placeholder="Professor Name" />
                <br />
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Exam Start Date</div>
                <input value={values.startDate} required name="startDate" onChange={handleChange} className="form_control" type="date" placeholder="Start Date" />
                <br />
                <div style={{ textAlign: "left", paddingLeft: "14%" }}>Exam End Date</div>
                <input value={values.endDate} required name="endDate" onChange={handleChange} className="form_control" type="date" placeholder="End Date" />
                <br />
                <button type="submit" style={{ marginTop: 15 }} className="custom_button">
                    Add
                </button>
            </form>
        </div>
    );
}

export default NewExam;
