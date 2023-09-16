"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Requests", "sectionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sections",
                key: "id",
                as: "sectionId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Requests", "sectionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sections",
                key: "id",
                as: "sectionId",
            },
        });
    },
};
