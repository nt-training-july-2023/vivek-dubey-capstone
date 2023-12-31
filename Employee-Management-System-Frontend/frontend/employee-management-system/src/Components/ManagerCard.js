import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/AllManagersList.css";
import { getRequest } from "../Services/Service";
import { GET_ALL_PROJECT_BY_MANAGER_ID } from "../Services/url";
export default function ManagerCard({ manager }) {
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [defaultProjectName, setDefaultProjectName] = useState("");

  async function apiCall() {
    const res = await getRequest(
      GET_ALL_PROJECT_BY_MANAGER_ID + manager.id
    );
    setProjectList(res.data);

    if (res.data.length) {
      const defaultProject = res.data[0];
      setSelectedProject(res.data[0].id + "");
      setDefaultProjectName(defaultProject.projectName);
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

  function handleChange(event) {
    setSelectedProject(event.target.value);
  }
  return (
    <div className="card" key={manager.id}>
      <div className="left-section-allmanagers">
        <div className="employee-name larger">{manager.empName}</div>
        <div className="field smaller" style={{ fontWeight: 600 }}>
          {manager.empDesignation}
        </div>
        <div className="field">
          <label htmlFor="projectName" style={{ fontWeight: 600 }}>
            Project
          </label>
          <select
            name="projectName"
            id="projectName"
            className="select"
            onChange={handleChange}
            value={selectedProject}
          >
            <option value="">{defaultProjectName || "Select Project"}</option>
            {projectList.map((project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.projectName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="field">
          <span style={{ fontWeight: 600 }}>Contact:</span>{" "}
          {manager.empContactNo}
        </div>
        <div className="field">
          <span style={{ fontWeight: 600 }}>Email:</span> {manager.empEmail}
        </div>
      </div>
      <div className="right-section-manager">
        <div className="employee-id ">
          <span style={{ fontWeight: 600 }}>Employee ID:</span> {manager.empId}
        </div>

        <div className="field">
          <span style={{ fontWeight: 600 }}>Skills Required:</span>
          {projectList.map((project) => {
            if (project.id + "" === selectedProject) {
              return project.skillsRequired.map((skill, index) => {
                const isLast = index === project.skillsRequired.length - 1;
                if (isLast) return skill;
                else return skill + ", ";
              });
            }
          })}
        </div>

        <div className="field">
          <span style={{ fontWeight: 600 }}>Team:</span>

          {projectList.map((project) => {
            if (project.id + "" === selectedProject) {
              return project.teamMembers.map((team, index) => {
                const isLast = index === project.teamMembers.length - 1;
                if (isLast) return team;
                else return team + ", ";
              });
            }
          })}
        </div>
        <div className="field">
          <span style={{ fontWeight: 600 }}>Location:</span>{" "}
          {manager.empLocation}
        </div>
      </div>
    </div>
  );
}
