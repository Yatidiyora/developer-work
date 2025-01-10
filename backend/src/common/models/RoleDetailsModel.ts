import { Sequelize, Model, DataTypes } from 'sequelize';
import { TABLES } from '../types/enums/CommonEnums';

export class RoleDetailsModel extends Model {
  public id: number;
  public name!: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
}

export const initRoleDetailsModel = (sequelize: Sequelize) => {
  RoleDetailsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      tableName: TABLES.ROLE_DETAILS,
    },
  );
};
