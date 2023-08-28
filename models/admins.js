const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.Admin = sequelize.define("Admin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

exports.getAdminByUsername = async username => {
    return await this.Admin.findOne({ where: { username } });
}

exports.createAdmin = async (username, name, password) => {
    let data = { name, username }
    data.password = await bcrypt.hash(password, 10);
    return await this.Admin.create(data);
}

exports.verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

exports.generateToken = user => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        role: 1,
    }, config.secret);
}

exports.verifyToken = token => {
    try {
        let data = jwt.verify(token, config.secret)
        if (data.role === 1) return data;
        return false;
    } catch (err) {
        return false;
    }
}

exports.getAllAdmins = async () => {
    return await this.Admin.findAll({ attributes: ["id", "username", "name"] });
}

exports.updateAdmin = async (adminId, name, username, password) => {
    let data = {};
    name && (data.name = name);
    username && (data.username = username);
    password && (data.password = await bcrypt.hash(password, 10));

    return await this.Admin.update(data, { where: { id: adminId } });
}

exports.deleteAdmin = async adminId => {
    return await this.Admin.destroy({ where: { id: adminId } });
}