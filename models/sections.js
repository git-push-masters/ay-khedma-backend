const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

exports.Section = sequelize.define('Section', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        defaultValue: "/icons/default.svg"
    }
})