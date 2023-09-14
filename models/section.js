"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Section extends Model {
        static associate(models) {
            this.hasMany(models.User, {
                foreignKey: "sectionId",
            });
            this.hasMany(models.Request, {
                foreignKey: "sectionId",
            });
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
                defaultValue: "/icons/default.png",
            },
        },
        {
            sequelize,
            modelName: "Section",
        }
    );

    Section.getSections = async () => {
        return await Section.findAll();
    };

    Section.getSectionById = async sectionId => {
        return await Section.findByPk(sectionId);
    };

    Section.createSection = async ({ name, icon }) => {
        const data = { name };
        icon && (data.icon = icon);
        return await Section.create(data);
    };

    Section.updateSection = async (sectionId, { name, icon }) => {
        const data = {};
        name && (data.name = name);
        icon && (data.icon = icon);
        return await Section.update(data, { where: { id: sectionId } });
    };

    Section.deleteSection = async sectionId => {
        return await Section.destroy({ where: { id: sectionId } });
    };

    return Section;
};
