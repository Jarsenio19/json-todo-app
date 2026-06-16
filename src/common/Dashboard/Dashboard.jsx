import { useState, useContext, useEffect } from "react";
import "./Dashboard.css";

import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { ImCheckboxChecked } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

import { TaskContext } from "../../context/TaskContext";

const Dashboard = () => {
  const { setFilter } = useContext(TaskContext)

  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)


  const handleFilter = (value) => {
    setFilter(value)

    // Auto close sidebar on mobile
    if (window.innerWidth <= 960) {
      setIsOpen(false)
    }
  }


  const toggleTheme = () => {
    const newTheme = !darkMode

    setDarkMode(newTheme);
    document.body.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark")
    }
  }, [])

  return (
    <>
      {/* Hamburger / Close Button */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`dash-container ${isOpen ? "sidebar-open" : ""
          }`}
      >
        <div className="dash">
          <ImCheckboxChecked className="checkedicon" />
          <h4 className="fw-bold ">
            Json To-Do List
          </h4>
        </div>

        <aside className="dashboard">
          <nav className="nav-container text-accent-900">
            <ul>
              <li onClick={() => handleFilter("all")}>
                <FaTasks className="icons" />
                All Task
              </li>

              <li onClick={() => handleFilter("completed")}>
                <FaRegCheckCircle className="icons" />
                Completed
              </li>

              <li onClick={() => handleFilter("trash")}>
                <HiOutlineTrash className="icons" />
                Trash
              </li>
            </ul>
          </nav>

          <div className="task-remaining">
            <button
              className={`theme-toggle ${darkMode ? "on" : "off"}`}
              onClick={toggleTheme}
            >
              <span className="toggle-circle"></span>
            </button>
          </div>
        </aside >
      </div >
    </>
  );
};

export default Dashboard;