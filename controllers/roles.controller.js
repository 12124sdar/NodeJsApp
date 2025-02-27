import { Sequelize } from 'sequelize'; 
import Roles from "../models/roles.js";




export const getAllRoles = async (req, res) => {
    try {
      const roles = await Roles.findAll();

      res.status(200).json({
        roles: roles,
      });

  
    } catch (error) {
      console.error('Error fetching roles:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };