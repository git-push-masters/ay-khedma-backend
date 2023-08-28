const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

exports.Request = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    thumbnailsText: {
        type: DataTypes.TEXT,
        defaultValue: "[]"
    },
    minPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    maxPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    durationRange: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locationLat: {
        type: DataTypes.FLOAT
    },
    locationLong: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.INTEGER // 1, 2, 3
    }
}, {
    getterMethods: {
        thumbnails() {
            return JSON.parse(this.getDataValue('thumbnailsText'));
        }
    },
    setterMethods: {
        thumbnails(value) {
            this.setDataValue('thumbnailsText', JSON.stringify(value));
        }
    }
})