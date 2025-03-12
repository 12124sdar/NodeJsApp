import { Sequelize } from "sequelize";
import config from "./config/config.json" assert { type: "json" };




// Development Configuration
const dbConfig = config.development;

// Sequelize Instance
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }
);

 
sequelize
  .authenticate()
  .then(() => console.log("Connected to the database successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;