"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Offer extends Model {
        static associate(models) {
            this.belongsTo(models.Request, {
                foreignKey: "requestId",
            })
            this.belongsTo(models.User, {
                foreignKey: "userId",
            })
        }
    }
    Offer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            scheduledAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            lastOffered: {
                type: DataTypes.BOOLEAN,
                defaultValue: false, // false: provider, true: seeker
            },
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 1, // 1: Negotiating, 2: Confirmed, 0: Rejected
            },
            isPaid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Offer",
        }
    )
    return Offer
}
