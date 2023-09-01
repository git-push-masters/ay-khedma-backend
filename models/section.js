"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Section extends Model {
        static associate(models) {
            this.hasMany(models.User, {
                foreignKey: "sectionId",
            })
            this.hasMany(models.Request, {
                foreignKey: "sectionId",
            })
        }
    }
    Section.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            icon: {
                type: DataTypes.STRING,
                defaultValue: "/icons/default.svg",
            },
        },
        {
            sequelize,
            modelName: "Section",
        }
    )
    return Section
}
