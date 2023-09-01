"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
        get thumbnails() {
            return JSON.parse(this.getDataValue("thumbnailsText"))
        }

        set thumbnails(value) {
            this.setDataValue("thumbnailsText", JSON.stringify(value))
        }

        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "userId",
            })
            this.hasMany(models.Offer, {
                foreignKey: "requestId",
            })
            this.hasOne(models.Review, {
                foreignKey: "requestId",
            })
            this.belongsTo(models.Section, {
                foreignKey: "sectionId",
            })
        }
    }
    Request.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            thumbnailsText: {
                type: DataTypes.TEXT,
                defaultValue: "[]",
            },
            minPrice: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
            },
            maxPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            durationRange: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            locationLat: {
                type: DataTypes.FLOAT,
            },
            locationLong: {
                type: DataTypes.FLOAT,
            },
            status: {
                type: DataTypes.INTEGER, // 1, 2, 3
            },
        },
        {
            sequelize,
            modelName: "Request",
        }
    )

    return Request
}
