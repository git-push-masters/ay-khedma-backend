const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { Section } = require('./sections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

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

exports.getUserByPhone = async (phone) => {
    return await this.User.findOne({ where: { phone } });
}

exports.getUserById = async (userId) => {
    return await this.User.findByPk(userId, { include: Section });
}

exports.createUser = async (name, phone, email, password, avatar, identity, address, bio, locationLat, locationLong, isPhoneVisible, isEmailVisible, isLocationVisible) => {
    let data = { name, phone };
    data.password = await bcrypt.hash(password, 10);
    email && (data.email = email);
    avatar && (data.avatar = avatar);
    identity && (data.identity = identity);
    address && (data.address = address);
    bio && (data.bio = bio);
    locationLat && (data.locationLat = locationLat);
    locationLong && (data.locationLong = locationLong);
    isPhoneVisible && (data.isPhoneVisible = isPhoneVisible);
    isEmailVisible && (data.isEmailVisible = isEmailVisible);
    isLocationVisible && (data.isLocationVisible = isLocationVisible);
    return await this.User.create(data);
}

exports.verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

exports.generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: 0
    }, config.secret);
}

exports.verifyToken = (token) => {
    try {
        let data = jwt.verify(token, config.secret);
        if (data.role === 0) return data;
        return false;
    } catch (err) {
        return false;
    }
}