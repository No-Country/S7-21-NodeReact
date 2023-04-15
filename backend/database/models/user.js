"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for a user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: The URL of the user's profile image.
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           enum: [admin, barber, client]
 *           description: The role of the user. Possible values are "admin", "barber", or "client".
 */

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ appointments, reviews }) {
      this.hasMany(appointments, { foreignKey: "clientId" });
      this.hasMany(appointments, { foreignKey: "barberId" });
      this.hasMany(reviews, { foreignKey: "barberId" });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "barber", "client"],
        defaultValue: "client",
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      verificationToken: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
