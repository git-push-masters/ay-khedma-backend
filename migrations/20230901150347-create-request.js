"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Requests", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            thumbnailsText: {
                type: Sequelize.TEXT,
                defaultValue: "[]",
            },
            minPrice: {
                type: Sequelize.INTEGER,
                defaultValue: 10,
            },
            maxPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            durationRange: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            locationLat: {
                type: Sequelize.FLOAT,
            },
            locationLong: {
                type: Sequelize.FLOAT,
            },
            status: {
                type: Sequelize.INTEGER, // 1, 2, 3
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
        await queryInterface.dropTable("Requests")
    },
}
