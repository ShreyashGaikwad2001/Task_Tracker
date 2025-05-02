import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState(''); // Define the projectInput state
  const [taskInputs, setTaskInputs] = useState({});

  // Fetch all projects when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  // Add a new project
  const handleAddProject = async () => {
    if (projectInput.trim()) {
      try {
        const res = await axios.post('http://localhost:5000/api/projects', { name: projectInput });
        setProjects(prevProjects => [...prevProjects, res.data]); // Avoid re-fetching the data
        setProjectInput(''); // Clear the project input field after adding
      } catch (err) {
        console.error('Error adding project:', err);
      }
    }
  };

  // Add a task to a project
  const handleAddTaskToProject = async (projectId, index) => {
    const taskInput = taskInputs[projectId];
    if (taskInput && taskInput.trim()) {
      try {
        const res = await axios.post('http://localhost:5000/api/tasks', {
          projectId,
          task: taskInput,
        });
        setProjects(prevProjects => {
          const updatedProjects = [...prevProjects];
          updatedProjects[index].tasks.push(res.data);
          return updatedProjects;
        });
        setTaskInputs(prevInputs => ({ ...prevInputs, [projectId]: '' })); // Clear task input
      } catch (err) {
        console.error('Error adding task:', err);
      }
    }
  };

  // Delete a project
  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
      setProjects(prevProjects => prevProjects.filter(p => p._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  // Delete a task from a project
  const handleDeleteTask = async (projectId, task, projectIndex, taskIndex) => {
    try {
      await axios.delete('http://localhost:5000/api/tasks', {
        data: { projectId, task },
      });
      setProjects(prevProjects => {
        const updatedProjects = [...prevProjects];
        updatedProjects[projectIndex].tasks.splice(taskIndex, 1);
        return updatedProjects;
      });
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>

      <button onClick={onLogout} className="logout-button">
        Logout
      </button>

      <div className="dashboard-section">
        <h2 className="dashboard-subheading">Add Project</h2>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter project"
            value={projectInput}
            onChange={(e) => setProjectInput(e.target.value)}
            className="dashboard-input"
          />
          <button onClick={handleAddProject} className="dashboard-button">
            Add Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <p>No projects available. Start by adding a project.</p>
      ) : (
        projects.map((project, index) => (
          <div key={project._id} className="dashboard-section">
            <h2 className="dashboard-subheading">{index + 1}. {project.name}</h2>
            <div className="input-row">
              <input
                type="text"
                placeholder="Enter task"
                value={taskInputs[project._id] || ''}
                onChange={(e) =>
                  setTaskInputs({ ...taskInputs, [project._id]: e.target.value })
                }
                className="dashboard-input"
              />
              <button
                onClick={() => handleAddTaskToProject(project._id, index)}
                className="dashboard-button"
              >
                Add Task
              </button>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteProject(project._id)}
            >
              Delete Project
            </button>

            <div style={{ marginTop: '20px' }}>
              <h3 className="dashboard-subheading">Tasks</h3>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th className="dashboard-th">#</th>
                    <th className="dashboard-th">Task</th>
                    <th className="dashboard-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {project.tasks.map((task, taskIndex) => (
                    <tr key={taskIndex}>
                      <td className="dashboard-td">{taskIndex + 1}</td>
                      <td className="dashboard-td">{task}</td>
                      <td className="dashboard-td">
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteTask(project._id, task, index, taskIndex)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
