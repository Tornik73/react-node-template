import CONFIG from "./config";
import { Sequelize } from "sequelize";

const conn = new Sequelize(
  CONFIG.DB_CONNECTION.database,
  CONFIG.DB_CONNECTION.user,
  CONFIG.DB_CONNECTION.password,
  {
    host: CONFIG.DB_CONNECTION.host,
    port: <any>(CONFIG.DB_CONNECTION.port),
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
);

export default conn;
