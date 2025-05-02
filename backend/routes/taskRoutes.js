const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task'); // Assuming Task is a separate model

// Add task
router.post('/', async (req, res) => {
  const { projectId, title, description } = req.body;

  // Validate required fields
  if (!projectId || !title || !description) {
    return res.status(400).json({ message: 'Project ID, Title, and Description are required' });
  }

  try {
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Create a new task associated with the project
    const task = new Task({
      projectId,
      title,
      description,
      status: 'Pending',  // Default status
    });

    // Save the task to the database
    await task.save();

    // Add the task to the project's tasks array
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json({ message: 'Task added', task });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/', async (req, res) => {
  const { projectId, taskId } = req.body;

  // Validate required fields
  if (!projectId || !taskId) {
    return res.status(400).json({ message: 'Project ID and Task ID are required' });
  }

  try {
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Check if the task exists in the project's tasks
    const taskIndex = project.tasks.indexOf(taskId);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found in project' });

    // Remove the task from the project's tasks array
    project.tasks.splice(taskIndex, 1);
    await project.save();

    // Optionally, delete the task from the Task collection (if required)
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
