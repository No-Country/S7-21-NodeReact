'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      appointmentDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      appointmentHour: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ["allow", "notAllow"],
        defaultValue: "allow",
        allowNull: false,
      },
      service: {
        type: Sequelize.STRING,
        values: ["Corte Pelo", "Corte Barba", "Corte Pelo Y Barba", "Lavado Y Corte", "Lavado Y Perfilado"],
        defaultValue: "Corte Pelo",
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};