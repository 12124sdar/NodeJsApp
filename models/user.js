import { DataTypes } from "sequelize";
import sequelize from '../db.js'; // Import the sequelize instance from db.js
import Task from './task.js';

  const User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Assuming status is true by default (active user)
    },
    create_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    update_date: DataTypes.DATE,
 
 
}, {
  tableName: 'users', // Ensure the table name matches the DB table (lowercase)
  timestamps: false // Set to true if your table has createdAt/updatedAt fields
});

 
  export default User;
 
