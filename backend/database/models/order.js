"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The UUID of the order
 *        orderitems:
 *          type: string
 *          description: A stringified array of order items
 *        clientId:
 *          type: string
 *          format: uuid
 *          description: The UUID of the client who made the order
 *        shippinFee:
 *          type: integer
 *          description: The shipping fee for the order
 *        subTotal:
 *          type: integer
 *          description: The subtotal for the order (before adding the shipping fee)
 *        total:
 *          type: integer
 *          description: The total amount for the order (including shipping fee)
 *      required:
 *        - id
 *        - orderitems
 *        - clientId
 *        - shippinFee
 *        - subTotal
 *        - total
 */

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      orderitems: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      shippinFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
