'use strict';
const {
  Model
} = require('sequelize');
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
          allowNull:false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};