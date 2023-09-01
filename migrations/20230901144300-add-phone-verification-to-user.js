"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Users", "isPhoneVerified", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        })

        await queryInterface.addColumn("Users", "phoneVerificationCode", {
            type: Sequelize.STRING,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Users", "isPhoneVerified")
        await queryInterface.removeColumn("Users", "phoneVerificationCode")
    },
}
