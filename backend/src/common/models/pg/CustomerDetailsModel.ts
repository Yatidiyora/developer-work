import { DataTypes, Model, Sequelize } from 'sequelize';
import { TABLES } from '../../types/enums/CommonEnums';

export class CustomerDetailsModel extends Model {
  public id: string;
  public customerName: string;
  public userName: string;
  public email: string;
  public createdAt: Date;
  public updatedAt: Date;
}

export const initCustomerDetailsModel = (sequelize: Sequelize) => {
  CustomerDetailsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      customerName: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      tableName: TABLES.CUSTOMER_DETAILS,
    },
  ).sync();
};
