import express from 'express';
import { Sequelize } from "sequelize";  
// import sequelize from "../../BackendProject/backend_project/db.js"; // This is where your Sequelize instance is configured
import taskRoutes from './routes/taskroute.js'; // Import task routes
import userRoutes from './routes/userroute.js'; // Import task routes
import taskdetailsroute from './routes/taskdetailsroute.js'; // Import task routes
import rolesRoute from './routes/rolesroute.js'; // Import task routes

import setupAssociations from './models/association.js';
import cors from 'cors'

import sequelize from './db.js';

const port = process.env.PORT || 8000;

const corsOptions = {
    //origin: ['http://localhost:8000','http://85.31.236.137:8080','http://localhost:4200'],   
    origin: ['http://localhost:8000','http://85.31.236.137:8080','http://localhost:4200','http://85.31.236.137:80','http://85.31.236.137'],   
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
  };
    

 
const app = express();
app.use(express.json());
   
app.use(cors(corsOptions));



app.use("/api/task", taskRoutes); 
app.use("/api/user", userRoutes); 
app.use("/api/taskdetail", taskdetailsroute); 
app.use("/api/roles", rolesRoute); 


 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
setupAssociations();
 
sequelize.sync({ alter: true })  
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Unable to sync the database:', err));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});