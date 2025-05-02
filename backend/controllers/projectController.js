// controllers/projectController.js
const Project = require('../models/Project');
const User = require('../models/User');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = new Project({
      title,
      description,
      user: req.userId,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject };
