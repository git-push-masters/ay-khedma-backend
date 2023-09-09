"use strict";
const Admin = require("../models").Admin;
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Admin.create({
            name: "Sherbiny",
            username: "sherbiny",
            password: await bcrypt.hash("admin", 10),
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Admins", null, {});
    },
};
