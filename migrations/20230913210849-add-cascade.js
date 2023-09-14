"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Users", "sectionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sections",
                key: "id",
                as: "sectionId",
            },
            onDelete: "SET NULL",
            allowNull: true,
        });

        await queryInterface.changeColumn("Requests", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });

        await queryInterface.changeColumn("Offers", "requestId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Requests",
                key: "id",
                as: "requestId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });

        await queryInterface.changeColumn("Offers", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });

        await queryInterface.changeColumn("Reviews", "requestId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Requests",
                key: "id",
                as: "requestId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });

        await queryInterface.changeColumn("Reviews", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });

        await queryInterface.changeColumn("Reports", "senderId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "senderId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });

        await queryInterface.changeColumn("Reports", "receiverId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "receiverId",
            },
            onDelete: "CASCADE",
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("Users", "sectionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sections",
                key: "id",
                as: "sectionId",
            },
        });

        await queryInterface.changeColumn("Requests", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
        });

        await queryInterface.changeColumn("Offers", "requestId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Requests",
                key: "id",
                as: "requestId",
            },
        });

        await queryInterface.changeColumn("Offers", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
        });

        await queryInterface.changeColumn("Reviews", "requestId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Requests",
                key: "id",
                as: "requestId",
            },
        });

        await queryInterface.changeColumn("Reviews", "userId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "userId",
            },
        });

        await queryInterface.changeColumn("Reports", "senderId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "senderId",
            },
        });

        await queryInterface.changeColumn("Reports", "receiverId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Users",
                key: "id",
                as: "receiverId",
            },
        });
    },
};
