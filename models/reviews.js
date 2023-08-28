const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

exports.Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    },
    details: {
        type: DataTypes.TEXT
    }
})