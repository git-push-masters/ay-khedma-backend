"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                as: "sender",
                foreignKey: "senderId",
            })
            this.belongsTo(models.User, {
                as: "receiver",
                foreignKey: "receiverId",
            })
        }
    }
    Report.init(
        {
            details: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Report",
        }
    )

    Report.createReport = async (senderId, receiverId, details) => {
        return await Report.create({ senderId, receiverId, details });
    }

    return Report
}
