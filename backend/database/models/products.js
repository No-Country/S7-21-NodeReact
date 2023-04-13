"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   *  components:
   *    schemas:
   *      products:
   *        type: object
   *        properties:
   *          id:
   *            type: string
   *            format: uuid
   *            description: The unique identifier for the product
   *          title:
   *            type: string
   *            description: The title of the product
   *          description:
   *            type: string
   *            description: The description of the product
   *          price:
   *            type: integer
   *            description: The price of the product
   *          stock:
   *            type: integer
   *            description: The amount of available stock for the product
   *          images:
   *            type: string
   *            description: The URL of the image for the product
   *        required:
   *          - id
   *          - title
   *          - description
   *          - price
   *          - stock
   *          - images
   */

  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
        type: DataTypes.STRING,
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
      images: {
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
