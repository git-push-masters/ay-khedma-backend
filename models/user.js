"use strict"
const { Model } = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
            },
            isPhoneVisible: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isPhoneVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            phoneVerificationCode: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            isEmailVisible: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
            },
            avatar: {
                type: DataTypes.STRING,
                defaultValue: "/avatars/default.png",
            },
            identity: {
                type: DataTypes.STRING,
            },
            bio: {
                type: DataTypes.TEXT,
            },
            locationLat: {
                type: DataTypes.FLOAT,
            },
            locationLong: {
                type: DataTypes.FLOAT,
            },
            isLocationVisible: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isTrusted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    )

    User.getUserByPhone = async phone => {
        return await User.findOne({ where: { phone } })
    }

    User.getUserById = async userId => {
        return await User.findByPk(userId, { include: Section })
    }

    User.createUser = async (
        name,
        phone,
        email,
        password,
        avatar,
        identity,
        address,
        bio,
        locationLat,
        locationLong,
        isPhoneVisible,
        isEmailVisible,
        isLocationVisible
    ) => {
        let data = { name, phone }
        data.password = await bcrypt.hash(password, 10)
        email && (data.email = email)
        avatar && (data.avatar = avatar)
        identity && (data.identity = identity)
        address && (data.address = address)
        bio && (data.bio = bio)
        locationLat && (data.locationLat = locationLat)
        locationLong && (data.locationLong = locationLong)
        isPhoneVisible && (data.isPhoneVisible = isPhoneVisible)
        isEmailVisible && (data.isEmailVisible = isEmailVisible)
        isLocationVisible && (data.isLocationVisible = isLocationVisible)
        return await User.create(data)
    }

    User.verifyPassword = async (user, password) => {
        return await bcrypt.compare(password, user.password)
    }

    User.generateToken = user => {
        return jwt.sign(
            {
                id: user.id,
                name: user.name,
                phone: user.phone,
                role: 0,
            },
            config.secret
        )
    }

    User.verifyToken = token => {
        try {
            let data = jwt.verify(token, config.secret)
            if (data.role === 0) return data
            return false
        } catch (err) {
            return false
        }
    }

    return User
}
