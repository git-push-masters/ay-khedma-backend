"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Sections", "icon", {
            type: Sequelize.STRING,
            defaultValue: "/icons/default.png",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Sections", "icon", {
            type: Sequelize.STRING,
            defaultValue: "/icons/default.svg",
        });
    },
};
