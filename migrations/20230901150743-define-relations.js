"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Users", "sectionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sections",
                key: "id",
                as: "sectionId",
            },
        })

        await queryInterface.addColumn("Requests", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
        })

        await queryInterface.addColumn("Offers", "requestId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Requests",
                key: "id",
                as: "requestId",
            },
        })

        await queryInterface.addColumn("Offers", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
        })

        await queryInterface.addColumn("Reviews", "requestId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Requests",
                key: "id",
                as: "requestId",
            },
        })

        await queryInterface.addColumn("Reviews", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
        })

        await queryInterface.addColumn("Reports", "senderId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "senderId",
            },
        })

        await queryInterface.addColumn("Reports", "receiverId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "receiverId",
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Users", "sectionId")
        await queryInterface.removeColumn("Requests", "userId")
        await queryInterface.removeColumn("Offers", "requestId")
        await queryInterface.removeColumn("Offers", "userId")
        await queryInterface.removeColumn("Reviews", "requestId")
        await queryInterface.removeColumn("Reviews", "userId")
        await queryInterface.removeColumn("Reports", "senderId")
        await queryInterface.removeColumn("Reports", "receiverId")
    },
}
