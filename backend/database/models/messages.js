"use strict";
const { Model } = require("sequelize");
/**
 * @openapi
 * components:
 *   schemas:
 *     messages:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the message.
 *         message:
 *           type: string
 *           description: The content of the message.
 *         clientId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the client who sent the message.
 *         barberId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the barber who received the message.
 *       required:
 *         - id
 *         - message
 *         - clientId
 *         - barberId
 */

module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  messages.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      barberId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "messages",
    }
  );
  return messages;
};
