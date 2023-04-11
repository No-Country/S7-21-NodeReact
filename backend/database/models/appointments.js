'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      appointmentHour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
          type: DataTypes.ENUM,
          values: ['allow', 'notAllow'],
          defaultValue: 'allow',
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
      modelName: 'appointments',
  });
  return appointments;
};