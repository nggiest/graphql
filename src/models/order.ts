import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface orderAttributes {
  id: number;
  transcode: string;
  created: Date;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  transcode!: string;
  created!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transcode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
