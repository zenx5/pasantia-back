import { Sequelize } from "sequelize";



export const database = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/indicadores.sqlite'
});
  


