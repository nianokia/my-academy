import { useState, useEffect, useContext, useMemo } from "react";
import { BackButton } from "../constants/constants";
import AuthContext from "../context/AuthContext";
import { fetchCourses } from "../api/course";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState("table");
  const [sort, setSort] = useState({ key: "name", direction: "asc" });
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    credits: "",
    enrollment_limit: "",
    created_by: "",
  });
  const { token } = useContext(AuthContext);
  
  // -------- FETCH ALL COURSES --------
  const getCourses = async () => {
    try {
      const response = await fetchCourses(token);
      
      setCourses(response);
      console.log("Fetched courses:", response);
    } catch (err) {
      console.error('Error fetching courses:', err);
      alert("Failed to load courses. Please try again.")
    }
  };
      
  // --- Call getCourses whenever the token changes ---
  useEffect(() => {
    if (token) getCourses();
  }, [token]);

  // -------- SORT & FILTER --------
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    // --- only updates the filter being changed, while leaving the other filters alone ---
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key) => {
    setSort((prev) => {
      // --- update sort state depending on event listener to toggle direction up or down ---
      const direction = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  }

  // -------- APPLY SORT & FILTER --------
  // --- useMemo to recalculate only when the courses, filters, or sort states change ---
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      // --- filter course data only if it matches the search input for each column ---
      const idMatch = (course.id || "").toLowerCase().includes(filters.id.toLowerCase());
      const nameMatch = (course.name || "").toLowerCase().includes(filters.name.toLowerCase());
      const creditsMatch = (course.credits?.toString() || "").includes(filters.credits);
      const enrollmentLimitMatch = (course.enrollment_limit?.toString() || "").includes(filters.enrollment_limit);
      const createdByMatch = (course.created_by || "").toLowerCase().includes(filters.created_by.toLowerCase());

      return idMatch && nameMatch && creditsMatch && enrollmentLimitMatch && createdByMatch;
    });

    filtered.sort((a, b) => {
      const key = sort.key;
      // --- convert key's value to a lowercase string or "" if value is null/ undefined --- 
      const aValue = a[key]?.toString().toLowerCase() ?? '';
      const bValue = b[key]?.toString().toLowerCase() ?? '';

      // --- compare values to properly order records based on sort direction ---
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [courses, filters, sort]);

  const handleViewToggle = () => {
    setView((prev) => (prev === "list" ? "table" : "list"))
  }

  return (
    <div className="AllCourses">
      <BackButton />
      <header>
        <h1>All Courses</h1>
        <button className="toggleViewBtn"
          onClick={() => setView((prev) => (prev === "list" ? "table" : "list"))}
        >
          Switch to {view === "list" ? "Table" : "List"} View
        </button>
      </header>
      {/* -------- FILTERS -------- */}
      <div className="filtersContainer">
        <h3>Filter Courses</h3>
        <div className="courseFilters">
          {Object.keys(filters).map((key) => (
            <input
              type="text"
              key={key}
              name={key}
              value={filters[key]}
              onChange={handleFilterChange}
              placeholder={`Filter by ${key}`}
            />
          ))}
        </div>
      </div>

      {/* -------- TOGGLE VIEW -------- */}
      {view === "table" ? (
        // -------- TABLE VIEW --------
        <table>
          <thead>
            <tr>
              {["id",
                "name",
                "credits",
                "enrollment_limit",
                "enrolled_count",
                "seats_available",
                "created_by",
              ].map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {/* --- Column name in ALL CAPS --- */}
                  {key.toUpperCase()}{" "}
                  {/* --- toggle sort of active key to show ↑ or ↓ arrow --- */}
                  {/* --- inactive keys will not show an arrow --- */}
                  {sort.key === key ? (sort.direction === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCourses.map((course) => (
              <tr key={course.id}>
                <td width="25%" className="courseIdRecord">{course.id}</td>
                <td width="12.5%">{course.name}</td>
                <td width="12.5%">{course.credits}</td>
                <td width="12.5%">{course.enrollment_limit}</td>
                <td width="12.5%">{course.enrolled_count ?? "N/A"}</td>
                <td width="12.5%">{course.seats_available ?? "N/A"}</td>
                <td width="12.5%">{course.created_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // -------- LIST VIEW --------
        <ul className="courseList">
          {filteredAndSortedCourses.map((course) => (
            <li key={course.id} className="singleCourse">
              <strong>{course.name}</strong>
              <ul className="courseData">
                <li>ID: {course.id}</li>
                <li>Credits: {course.credits}</li>
                <li>Enrollment Limit: {course.enrollment_limit}
                  <ul>
                    <li>Currently Enrolled: {course.enrolled_count ?? "N/A"}</li>
                    <li>Seats Available: {course.seats_available ?? "N/A"}</li>
                  </ul>
                </li>
                <li>Created by: {course.created_by}</li>
                {/* -------- PREREQUISISTES (only for list view) -------- */}
                <li>
                  <strong>Prerequisites:</strong>{" "}
                  {course.prerequisites?.length > 0 ? (
                    <ul>
                      {course.prerequisites.map((prereq) => (
                        <li key={prereq.id}>{prereq.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No prerequisites</span>
                  )}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {filteredAndSortedCourses.length === 0 && <p>No courses found.</p>}
    </div>
  );
};

export default AllCourses;