"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *  schemas:
 *    reviews:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The unique identifier for a review.
 *        title:
 *          type: string
 *          description: The title of the review.
 *        rating:
 *          type: integer
 *          minimum: 1
 *          maximum: 5
 *          description: The rating score of the review, with 1 being the lowest and 5 being the highest.
 *        comment:
 *          type: string
 *          description: The comment of the review.
 *        clientId:
 *          type: string
 *          format: uuid
 *          description: The unique identifier for the client who created the review.
 *        barberId:
 *          type: string
 *          format: uuid
 *          description: The unique identifier for the barber who is being reviewed.
 *      required:
 *        - title
 *        - rating
 *        - comment
 *        - clientId
 *        - barberId
 */

module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reviews.init(
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
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
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
      modelName: "reviews",
    }
  );
  return reviews;
};
