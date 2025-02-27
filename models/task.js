import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import the initialized sequelize instance
import User from './user.js';

// Define Task model
const Task = sequelize.define('Task', {
  id: { 
    autoIncrement: true, 
    type: DataTypes.BIGINT, 
    allowNull: false, 
    primaryKey: true 
  },
  main_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sub_title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  assigned_to: {
    type: DataTypes.INTEGER,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  day_period: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  ending_date: {
    type: DataTypes.DATE,
  },
  comments: {
    type: DataTypes.TEXT,
  },
  is_archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
create_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  created_user: {
    type: DataTypes.STRING,
  },
  
}, {
  tableName: 'tasks', // Ensure the table name matches the DB table (lowercase)
  timestamps: false // Set to true if your table has createdAt/updatedAt fields
});

 

export default Task;
