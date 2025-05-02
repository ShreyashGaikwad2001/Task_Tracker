const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    projectId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Completed'], 
      default: 'Pending' 
    },
    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default: null // Optional, if you want to assign tasks to users
    }
  },
  { 
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Task', taskSchema);
