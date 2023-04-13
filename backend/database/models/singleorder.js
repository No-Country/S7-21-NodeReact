"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     singleOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for a single order.
 *         productId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the product in the order.
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the order.
 *         price:
 *           type: integer
 *           description: The price of the product in the order.
 */

module.exports = (sequelize, DataTypes) => {
  class singleorder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  singleorder.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      productid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "singleorder",
    }
  );
  return singleorder;
};
