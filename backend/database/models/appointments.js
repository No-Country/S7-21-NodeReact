"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     appointments:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the appointment.
 *         appointmentDate:
 *           type: string
 *           format: date
 *           description: Date of the appointment (YYYY-MM-DD).
 *         appointmentHour:
 *           type: string
 *           description: Hour of the appointment (HH:mm).
 *         status:
 *           type: string
 *           enum: [allow, notAllow]
 *           description: Status of the appointment.
 *       required:
 *         - id
 *         - appointmentDate
 *         - appointmentHour
 *         - status
 */

module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "clientId" });
      this.belongsTo(User, { foreignKey: "barberId" });
    }
  }
  appointments.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      appointmentHour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["allow", "notAllow"],
        defaultValue: "allow",
        allowNull: false,
      },
      // clientId: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
      // barberId: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
    },
    {
      sequelize,
      modelName: "appointments",
    }
  );
  return appointments;
};
