const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

exports.Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    details: {
        type: DataTypes.TEXT
    }
})