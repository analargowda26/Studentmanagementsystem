import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DeleteStudent.css";

const DeleteStudent = () => {
  const [student, setStudent] = useState({ name: "", age: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch student details for confirmation
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/student/${id}`);
        const data = await response.json();

        if (data.success && data.student) {
          setStudent({
            name: data.student.name,
            age: data.student.age,
          });
        } else {
          alert("Failed to load student details");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle delete
  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${student.name}"?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        alert("Student deleted successfully!");
        navigate("/students");
      } else {
        alert("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="delete-student-container">
      <h1 className="form-title">Delete Student</h1>
      <form className="student-form" onSubmit={handleDelete}>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-input"
            type="text"
            value={student.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            className="form-input"
            type="number"
            value={student.age}
            disabled
          />
        </div>

        <button className="delete-btn" type="submit">
          Delete Student
        </button>
      </form>
    </div>
  );
};

export default DeleteStudent;
