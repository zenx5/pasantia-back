import { Sequelize, DataTypes, Model } from 'sequelize'
import { database } from './database.js'


const User = database.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{})

const Proyect = database.define('Proyects', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false
    },
},{})

const Entity = database.define('Entities', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dependence: {
    type: DataTypes.STRING,
    allowNull: false
  },
  influence: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  belongsTo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
},{})



//associations
User.hasMany(Proyect)
Proyect.belongsTo(User)

Proyect.hasMany(Entity)
Entity.belongsTo(Proyect)

export {
    User, 
    Proyect,
    Entity
}