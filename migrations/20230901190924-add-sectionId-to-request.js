"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Requests", "sectionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sections",
                key: "id",
                as: "sectionId",
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Requests", "sectionId")
    },
}
