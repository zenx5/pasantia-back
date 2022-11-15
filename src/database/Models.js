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
},{})

const Module = database.define('Modules', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
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
  description: {
      type: DataTypes.STRING,
      allowNull: false
  },    
  type: {
      type: DataTypes.STRING,
      allowNull: false
  },
},{})


const Feature = database.define('Features', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },    
},{})


//associations
User.hasMany(Proyect)
Proyect.belongsTo(User)

Proyect.belongsToMany(Module,{ through: 'Proyect_Modules' })
Module.belongsToMany(Proyect,{ through: 'Proyect_Modules' })

Proyect.hasMany(Entity)
Entity.belongsTo(Proyect)

export {
    User, 
    Proyect,
    Module,
    Entity, 
    Feature
}