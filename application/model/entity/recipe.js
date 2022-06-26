var Sequelize = require('sequelize');
var sequelize = require('../db');

const ingredients = sequelize.define('ingredients', {
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
    }
}, {
    freezeTableName: true
});

exports.recipe = recipe;