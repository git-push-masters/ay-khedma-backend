const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

exports.Offer = sequelize.define('Offer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scheduledAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastOffered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // false: provider, true: seeker
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // 1: Negotiating, 2: Confirmed, 0: Rejected
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})