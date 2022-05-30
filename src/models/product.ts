import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface productAttributes {
  id: number;
  name: string;
  stock: number;
  price: number;
  created: Date;
}

export type productPk = "id";
export type productId = product[productPk];
export type productCreationAttributes = productAttributes;

export class product extends Model<productAttributes, productCreationAttributes> implements productAttributes {
  id!: number;
  name!: string;
  stock!: number;
  price!: number;
  created!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof product {
    return product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false
  });
  }
}
