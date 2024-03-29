var Sequelize = require('sequelize');
var sequelize = require('../db');

const user_profile = sequelize.define('user_profile', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    bookmark: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bannedingredients: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usertype: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        default: 0
    }
}, {
    freezeTableName: true
});

exports.user_profile = user_profile;