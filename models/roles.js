import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Import the initialized sequelize instance


// Define Task model
const Roles = sequelize.define('Roles', {
  id: { 
    autoIncrement: true, 
    type: DataTypes.BIGINT, 
    allowNull: false, 
    primaryKey: true 
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
create_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'roles', 
  timestamps: false  
});

 

export default Roles;
