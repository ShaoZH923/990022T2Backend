var Sequelize = require('sequelize');
var sequelize = require('../db');

const ingredients = sequelize.define('ingredients', {
    iid: {
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
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

exports.ingredients = ingredients;