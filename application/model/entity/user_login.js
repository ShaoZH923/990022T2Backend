var Sequelize = require('sequelize');
var sequelize = require('../db');

const user_login = sequelize.define('user_login', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accountType: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

exports.user_login = user_login;