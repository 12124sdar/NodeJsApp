import { DataTypes } from "sequelize";
import sequelize from '../db.js'; // Import the sequelize instance from db.js
import Task from './task.js';

  const Category = sequelize.define("Category", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cat_description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
}, {
  tableName: 'category', // Ensure the table name matches the DB table (lowercase)
  timestamps: false // Set to true if your table has createdAt/updatedAt fields
});

 
  export default Category;
 
