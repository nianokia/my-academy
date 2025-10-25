import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { fetchCourses } from "../api/course";

const EditCourse = ({ setIsModalOpen }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    credits: "",
    enrollment_limit: "",
    prerequisites: [],
  });

  const { token } = useContext(AuthContext);

  // --- Define the API route using the environment variable ---
  const tableRoute = `${import.meta.env.VITE_DOMAIN}/api/courses`;
  console.log('Table Route:', tableRoute);
  
  // -------- FETCH ALL COURSES --------
  const getCourses = async () => {
    try {
      const response = await fetchCourses(token);      
      setCourses(response);
    } catch (err) {
      console.error('Error fetching courses:', err);
      alert("Failed to load courses. Please try again.")
    }
  };

  // --- Call fetchCourses whenever the tableRoute changes ---
  useEffect(() => {
    if (token) getCourses();
  }, [token]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // --- handle select element change ---
  const handlePrereqChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, prerequisites: selected }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setIsModalOpen(false);
    } catch (error) {
      alert('Failed to update course. Please try again.');
      console.error('Error updating course:', error.name, '\n', error.message, '\n Url:', error.config.url);
    }
  }

  // ---------------- ADDCOURSE handleSubmit ----------------
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   console.log("Submitting AddCourse form: \n token:", token);
  //   console.log("Submitting AddCourse form: \n formData:", formData);

  //   try {
  //     const response = await createCourse(formData, token);
  //     console.log("createCourse response:", response);
  //     alert("Course has been added!")
      
  //     if (onSuccess) onSuccess();

  //     if (!response) throw new Error("Failed to create course");
  //   } catch (err) {
  //     console.error("Error creating course: ", err?.response ?? err);
  //     alert("Error creating course: " + (err?.response?.data?.message || err.message));
  //   }
  // };
  

  // // --------------- EDITPROFILE handleSubmit ----------------
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await updateUser(user.id, formData, token);

  //     const updatedUser = response.user || response;

  //     // --- Update user data & close modal ---
  //     setUser(updatedUser);
  //     alert('Profile updated successfully!');
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     alert('Failed to update profile. Please try again.');
  //     console.error('Error updating profile:', error.name, '\n', error.message, '\n Url:', error.config.url);
  //   }
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} className="AddCourseForm">
        <div className="formGroup">
          <label htmlFor="title">Course Title</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Course Title" required />
        </div>
        <div className="formGroup">
          <label htmlFor="credits">Credits</label>
          <input type="number" name="credits" value={formData.credits} min={1} onChange={handleChange} placeholder="Credits" required />
        </div>
        <div className="formGroup">
          <label htmlFor="enrollment_limit">Enrollment Limit</label>
          <input type="number" name="enrollment_limit" value={formData.enrollment_limit} min={1} onChange={handleChange} placeholder="Enrollment Limit" required />
        </div>

        <label htmlFor="prerequisites">Prerequisites</label>
        <select
          multiple
          name="prerequisites"
          value={formData.prerequisites}
          onChange={handlePrereqChange}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
};

export default EditCourse;