import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { fetchCourses, fetchCourseById, updateCourse } from "../api/course";

const EditCourse = ({ courseId, setIsModalOpen }) => {
  const { token } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    credits: '',
    enrollment_limit: '',
    prerequisites: [],
  });

  // -------- FETCH SINGLE COURSE --------
  const getCourse = async () => {
    try {
      const data = await fetchCourseById(courseId, token);
      setCourse(data);
      console.log("Inside EditCourse.jsx \n Fetched Course Details: ", data);
    } catch (err) {
      console.error("Error fetching course details: ", err);
    }
  };
  
  // -------- FETCH ALL COURSES --------
  const getCourses = async () => {
    try {
      const response = await fetchCourses(token);      
      setCourses(response);
    } catch (err) {
      console.error('Error fetching courses:', err);
      alert("Failed to load courses. Please try again.");
    }
  };

  // --- Call getCourses whenever the token changes ---
  useEffect(() => {
    if (token) getCourses();
  }, [token]);

  // --- Call getCourse whenever id or token changes ---
  useEffect(() => {
    getCourse();
  }, [courseId, token]);

  // --- Call setFormData whenever course changes if it exists --
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        credits: course.credits || '',
        enrollment_limit: course.enrollment_limit || '',
        prerequisites: [],
      });
    }
  }, [course]);

  // --- handle input element change ---
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // --- handle select element change ---
  const handlePrereqChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, prerequisites: selected }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateCourse(courseId, formData, token);
      if (!response) throw new Error("Failed to update course");

      const updatedCourse = response.course || course;

      setCourse(updatedCourse);
      console.log("Submitted EditCourse form: \n updatedCourse:", updatedCourse);
      alert(`${updatedCourse.name} updated successfully!`);
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to update course. Please try again.', err?.response ?? err);
      console.error('Error updating course:', err.name, '\n', err.message, '\n Url:', err.config.url);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("formData: ", formData);

  if (!course) return <p>Loading course...</p>;

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
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
};

export default EditCourse;