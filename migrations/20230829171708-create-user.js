"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      isPhoneVisible: {
        type: Sequelize.BOOLEAN,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      isEmailVisible: {
        type: Sequelize.BOOLEAN,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "/avatars/default.png",
      },
      identity: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      locationLat: {
        type: Sequelize.FLOAT,
      },
      locationLong: {
        type: Sequelize.FLOAT,
      },
      isLocationVisible: {
        type: Sequelize.BOOLEAN,
      },
      isTrusted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Users")
  },
}
