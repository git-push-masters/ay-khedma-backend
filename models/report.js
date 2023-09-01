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
    return Report
}
