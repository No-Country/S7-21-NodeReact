'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
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
      satus: {
        type: Sequelize.ENUM,
        allowNull: false
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      barberId: {
        type: Sequelize.UUID,
        allowNull: false
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