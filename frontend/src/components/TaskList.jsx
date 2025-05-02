import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // Handle adding a task
  const handleAddTask = async () => {
    if (taskInput.trim()) {
      try {
        // If you don't need to use the response, remove the 'res' variable
        await axios.post('/api/tasks', { task: taskInput });

        // Update tasks list
        setTasks([...tasks, taskInput]);
        setTaskInput('');  // Reset the input field
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
