"use strict";

/**
 * @openapi
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for a user.
 *         title:
 *           type: string
 *           description: Name of the product.
 *         description:
 *           type: string
 *           description: Description about the product.
 *         price:
 *           type: integer
 *           description: Price of the product.
 *         stock:
 *           type: integer
 *           description: Quantity of the product in stock.
 *         productImage:
 *           type: string
 *           format: uri
 *           description: The URL of the user's profile image.
 */
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate({ Cart }) {
      this.belongsTo(Cart, { foreignKey: "cartId" });
    }
  }
  products.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
