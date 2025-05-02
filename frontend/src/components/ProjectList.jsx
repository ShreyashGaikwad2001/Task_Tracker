import React, { useEffect, useState } from 'react';
import { fetchProjects, createProject } from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');

  const loadProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      await createProject({ title, description: '', status: 'Pending' });
      setTitle('');
      loadProjects();
    } catch (err) {
      console.error('Failed to create project:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h3>Projects</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Project Title"
      />
      <button onClick={handleAdd}>Add Project</button>
      <ul>
        {projects.map((p) => (
          <li key={p._id}>{p.title} - {p.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
