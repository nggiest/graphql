import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface orderdetailAttributes {
  id: number;
  product_id: number;
  price: number;
  quantity: number;
  order_id: number;
}

export type orderdetailPk = "id";
export type orderdetailId = orderdetail[orderdetailPk];
export type orderdetailCreationAttributes = orderdetailAttributes;

export class orderdetail extends Model<orderdetailAttributes, orderdetailCreationAttributes> implements orderdetailAttributes {
  id!: number;
  product_id!: number;
  price!: number;
  quantity!: number;
  order_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof orderdetail {
    return orderdetail.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orderdetail',
    timestamps: false
  });
  }
}
