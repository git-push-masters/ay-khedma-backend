const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

exports.User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    isPhoneVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    isEmailVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "/avatars/default.png"
    },
    identity: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    },
    locationLat: {
        type: DataTypes.FLOAT
    },
    locationLong: {
        type: DataTypes.FLOAT
    },
    isLocationVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isTrusted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});