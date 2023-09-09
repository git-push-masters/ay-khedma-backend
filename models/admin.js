"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Admin.init(
        {
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Admin",
        }
    );

    Admin.getAllAdmins = async () => {
        const admins = await Admin.findAll({
            attributes: ["id", "name", "username"],
        });
        return admins;
    };

    Admin.getAdminByUsername = async username => {
        return await Admin.findOne({ where: { username } });
    };

    Admin.createAdmin = async (username, name, password) => {
        let data = { name, username };
        data.password = await bcrypt.hash(password, 10);
        return await Admin.create(data);
    };

    Admin.verifyPassword = async (user, password) => {
        return await bcrypt.compare(password, user.password);
    };

    Admin.generateToken = user => {
        return jwt.sign(
            {
                id: user.id,
                name: user.name,
                username: user.username,
                role: 1,
            },
            config.secret
        );
    };

    Admin.verifyToken = async token => {
        try {
            let data = jwt.verify(token, config.secret);
            const admin = await Admin.findByPk(data.id);
            if (!admin || data.role !== 1) return false;
            return data;
        } catch (err) {
            return false;
        }
    };

    Admin.getAllAdmins = async () => {
        return await Admin.findAll({ attributes: ["id", "username", "name"] });
    };

    Admin.updateAdmin = async (adminId, name, username, password) => {
        let data = {};
        name && (data.name = name);
        username && (data.username = username);
        password && (data.password = await bcrypt.hash(password, 10));

        return await Admin.update(data, { where: { id: adminId } });
    };

    Admin.deleteAdmin = async adminId => {
        return await Admin.destroy({ where: { id: adminId } });
    };

    return Admin;
};
