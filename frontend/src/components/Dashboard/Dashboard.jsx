import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    date: "",
    time: "",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || token === "undefined") {
      navigate("/");
    } else {
      fetchAppointments();
    }
  }, [navigate]);

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "https://interview-task-backend.onrender.com/api/ts/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setAppointments(response.data.data); // Accessing data array from the response
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate date (no past dates allowed)
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (selectedDate < today) {
      alert("You cannot select a past date.");
    } else {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  // Handle form submission for create or update appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      try {
        await axios.put(
          `https://interview-task-backend.onrender.com/api/ts/update/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setEditing(false);
        setFormData({ name: "", role: "", date: "", time: "" });
        setEditId(null);
        fetchAppointments(); // Refresh appointments
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    } else {
      try {
        await axios.post(
          "https://interview-task-backend.onrender.com/api/ts/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setFormData({ name: "", role: "", date: "", time: "" });
        fetchAppointments(); // Refresh appointments
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };

  // Handle delete appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://interview-task-backend.onrender.com/api/ts/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      fetchAppointments(); // Refresh appointments
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Handle edit appointment
  const handleEdit = (appointment) => {
    setFormData({
      name: appointment.name,
      role: appointment.role,
      date: appointment.date,
      time: appointment.time,
    });
    setEditing(true);
    setEditId(appointment._id);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="dashboard-container">
        {/* Right Panel */}
        <div className="right-panel">
          <h2>{editing ? "Edit Appointment" : "Create Appointment"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleDateChange} // Use the handleDateChange to validate
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">
              {editing ? "Update Appointment" : "Create Appointment"}
            </button>
          </form>

          <h2>Appointments</h2>
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <p>
                  <strong>Name:</strong> {appointment.name}
                </p>
                <p>
                  <strong>Role:</strong> {appointment.role}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
