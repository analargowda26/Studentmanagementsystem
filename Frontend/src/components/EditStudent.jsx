import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditStudent.css"; // Importing the CSS file

const EditStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/student/${id}`);
        const data = await response.json();
        if (data.success) {
          setName(data.student.name);
          setAge(data.student.age);
        } else {
          alert("Failed to load student details");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Student updated successfully");
        navigate("/students");
      } else {
        alert("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="edit-student-container">
      <h1 className="form-title">Edit Student</h1>
      <form className="student-form" onSubmit={handleUpdate}>
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

        <button className="update-btn" type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
