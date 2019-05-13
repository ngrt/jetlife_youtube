const Sequelize = require('sequelize');
const db = require('../config/database');

const Jetski = db.define('jetski', {
    name: {
        type: Sequelize.STRING
    },    
    type: {
        type: Sequelize.STRING
    },   
    location: {
        type: Sequelize.STRING
    },    
    email: {
        type: Sequelize.STRING
    },   
    price: {
        type: Sequelize.INTEGER
    },   
    description: {
        type: Sequelize.STRING
    },
})

module.exports = Jetski;