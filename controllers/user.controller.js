
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Category from "../models/category.js";
import Sub_Category from "../models/sub_category.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const createUser = async (req, res) => {
    try {
      const { username, password, email, status,role } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = await User.create({
        username,
        password: hashedPassword,  
        email,
        status,
        role
      });
  

      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });

    
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

 

  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        order: [['id', 'ASC']] // Order by id in ascending order
      });
    
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



  export const getAllCategory = async (req, res) => {
    try {
      const users = await Category.findAll({
        order: [['id', 'ASC']] // Order by id in ascending order
      });
    
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching Category:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  export const getAllSubCategoryList = async (req, res) => {
    try {
      const users = await Sub_Category.findAll({
        order: [['id', 'ASC']] // Order by id in ascending order
      });
    
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching Sub Category:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password, email, status,role } = req.body;
      
      
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update user fields

      const hashedPassword = await bcrypt.hash(password, 10); 
 console.log("hashedpaaa",hashedPassword)
      user.username = req.body.userName || user.username;
      user.password = hashedPassword || user.password;
      user.email = email || user.email;
      user.status = status !== undefined ? status : user.status;
      user.update_date = new Date(); // Update the timestamp when the user is updated
      user.role = role || req.body.role

      await user.save();
  
      

      res.status(201).json({
        message: "User updated successfully",
        user: user,
      });

    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Find user by email
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
  

console.log("User Input Password:", password);
console.log("Hashed Password from DB:", user.password);
console.log("Passwords Match:", isMatch);


      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const payload = {
        id: user.id,
        username: user.username,
        status: user.status,
      };
  
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  console.log('jwtToken',JWT_SECRET)
      res.status(200).json({ token, username: user.username  });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  
  export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log(token);
  
    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }
  
      req.user = user; // Attach the decoded user payload to the request object
  
      // Token is valid, return a 200 OK response
      return res.status(200).json({ message: 'OK' });
    });
  };