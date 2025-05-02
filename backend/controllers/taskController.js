const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
  const { projectId, title, description } = req.body;

  // Validate required fields
  if (!projectId || !title || !description) {
    return res.status(400).json({ message: 'Project ID, Title, and Description are required' });
  }

  try {
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create a new task associated with the project
    const task = new Task({
      projectId,
      title,
      description,
      status: 'Pending',  // Default status
    });

    // Save the task to the database
    await task.save();

    // Return task details along with project name
    res.status(201).json({
      task,
      projectName: project.title,  // Assuming 'title' is the name of the project
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask };
