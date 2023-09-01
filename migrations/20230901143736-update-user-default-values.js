"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Users", "isPhoneVisible")
        await queryInterface.removeColumn("Users", "isEmailVisible")
        await queryInterface.removeColumn("Users", "isLocationVisible")
        await queryInterface.removeColumn("Users", "isTrusted")

        await queryInterface.addColumn("Users", "isPhoneVisible", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        })

        await queryInterface.addColumn("Users", "isEmailVisible", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        })

        await queryInterface.addColumn("Users", "isLocationVisible", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        })

        await queryInterface.addColumn("Users", "isTrusted", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Users", "isPhoneVisible")
        await queryInterface.removeColumn("Users", "isEmailVisible")
        await queryInterface.removeColumn("Users", "isLocationVisible")
        await queryInterface.removeColumn("Users", "isTrusted")

        await queryInterface.addColumn("Users", "isPhoneVisible", {
            type: Sequelize.BOOLEAN,
        })

        await queryInterface.addColumn("Users", "isEmailVisible", {
            type: Sequelize.BOOLEAN,
        })

        await queryInterface.addColumn("Users", "isLocationVisible", {
            type: Sequelize.BOOLEAN,
        })

        await queryInterface.addColumn("Users", "isTrusted", {
            type: Sequelize.BOOLEAN,
        })
    },
}
