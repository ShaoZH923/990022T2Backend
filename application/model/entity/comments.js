var Sequelize = require('sequelize');
var sequelize = require('../db');

const comments = sequelize.define('comments', {
    cid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    rid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
}, {
    freezeTableName: true
});

exports.comments = comments;