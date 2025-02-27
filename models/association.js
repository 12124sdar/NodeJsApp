import User from './user.js';
import Task from './task.js';

const setupAssociations = () => {
  User.hasMany(Task, { foreignKey: 'assigned_to' });  
  Task.belongsTo(User, { foreignKey: 'assigned_to' });  
};

export default setupAssociations;
