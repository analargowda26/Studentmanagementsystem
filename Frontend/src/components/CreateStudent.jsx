import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudent.css"; // Importing the CSS file

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name", name);
    console.log("age", age);

    const response = await fetch("http://localhost:3000/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Student created successfully");
      navigate("/students");
    } else {
      alert("Failed to create student");
    }
  };

  return (
    <div className="create-student-container">
      <h1 className="form-title">Create Student</h1>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="form-input"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            className="form-input"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
