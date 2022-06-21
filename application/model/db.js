let Sequelize = require('sequelize');
let Config = require("../../config/dev").mysql['aws'];

module.exports = new Sequelize(Config.database, Config.username, Config.password, {
    host: Config.host, // database address
    dialect: 'mysql', // database type
    define: {
        timestamps: false
    },
    pool: {
        max: 10, // maximum connection of the pool
        min: 0, // minimum connection of the pool
        idle: 10000 // release the thread if there are no connections for 10 seconds (10000 ms)
    },
    timezone: '-04:00'
});