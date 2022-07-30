var Sequelize = require('sequelize');
var sequelize = require('../db');

const rating = sequelize.define('rating', {
    rate_num: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    rid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

exports.rating = rating;