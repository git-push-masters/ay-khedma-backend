"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Requests", "status", {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Requests", "status", {
            type: Sequelize.INTEGER,
        });
    },
};
