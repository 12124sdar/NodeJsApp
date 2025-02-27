import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import the initialized sequelize instance
import Task from './task.js'; // Import the Task model to establish the relationship

// Define TaskDetails model
const TaskDetails = sequelize.define('TaskDetails', {
  id: { 
    autoIncrement: true, 
    type: DataTypes.BIGINT, 
    allowNull: false, 
    primaryKey: true 
  },
  addition_no: {
    type: DataTypes.INTEGER, 
    allowNull: false,  
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  day: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  addition_date: {
    type: DataTypes.DATE,
    allowNull: true,  
  },
  taskId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Task,  
      key: 'id',    
    }
  },
  created_by: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'task_details',  
  timestamps: false,          
});

// Define relationships
TaskDetails.belongsTo(Task, { foreignKey: 'taskId' });

export default TaskDetails;
