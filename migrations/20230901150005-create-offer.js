"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Offers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            scheduledAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            lastOffered: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            isPaid: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Offers")
    },
}
