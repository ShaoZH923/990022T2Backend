var Sequelize = require('sequelize');
var sequelize = require('../db');

const recipe = sequelize.define('recipe', {
    rid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    steps: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ingredients: {
        type: Sequelize.STRING,
        allowNull: false
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: -1        
    }
}, {
    freezeTableName: true
});

exports.recipe = recipe;