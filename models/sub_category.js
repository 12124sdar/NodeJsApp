import { DataTypes } from "sequelize";
import sequelize from '../db.js'; // Import the sequelize instance from db.js
import Task from './task.js';

  const Sub_Category = sequelize.define("sub_category", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    sub_cat_description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
}, {
  tableName: 'sub_category', // Ensure the table name matches the DB table (lowercase)
  timestamps: false // Set to true if your table has createdAt/updatedAt fields
});

 
  export default Sub_Category;
 
