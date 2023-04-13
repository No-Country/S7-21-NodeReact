"use strict";

const { faker } = require("@faker-js/faker");
const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const barbers = await User.findAll({
      where: { role: "barber" },
    });
    const clients = await User.findAll({
      where: { role: "client" },
      attributes: ["id"],
    });
    const clientIds = clients.map((user) => user.id);
    const appointmentsList = [];
    let date, hour;
    for (let barber of barbers) {
      for (let i = 0; i < 5; i++) {
        date = `2023-04-${17 + i}`;
        for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
          const createdAt = faker.date.recent();
          hour = `${9 + j}:00`;
          const appointment = {
            id: faker.datatype.uuid(),
            service: faker.helpers.arrayElement([
              "Corte Pelo",
              "Corte Barba",
              "Corte Pelo Y Barba",
              "Lavado Y Corte",
              "Lavado Y Perfilado",
            ]),
            message: faker.lorem.sentence(5),
            appointmentDate: date,
            appointmentHour: hour,
            barberId: barber.id,
            clientId: faker.helpers.arrayElement(clientIds),
            status: "notAllow",
            createdAt,
            updatedAt: createdAt,
          };
          appointmentsList.push(appointment);
        }
      }
    }
    await queryInterface.bulkInsert("appointments", [...appointmentsList]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
