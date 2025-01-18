import { DataTypes, Model, Sequelize } from 'sequelize';
import { TABLES } from '../../types/enums/CommonEnums';

export class OrdersDetailsModel extends Model {
  public id: string;
  public customerId: string;
  public orderName: string;
  public orderDate: string;
  public orderAmount: number;
  public createdAt: Date;
  public updatedAt: Date;
}

export const initOrdersDetailsModel = (sequelize: Sequelize) => {
  OrdersDetailsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.UUID,
      },
      orderName: {
        type: DataTypes.STRING,
      },
      orderDate: {
        type: DataTypes.STRING,
      },
      orderAmount: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      tableName: TABLES.ORDER_DETAILS,
    },
  ).sync();
};
