import { Sequelize } from "sequelize";
import getConfig from "../config/config";
import {
  initConfigurationDetailsModel,
  ConfigurationDetailsModel,
} from "./ConfigurationDetailsModel";
import { initUserDetailsModel, UserDetailsModel } from "./UserDetailsModel";
import {
  initRolePermissionDetailsModel,
  RolePermissionDetailsModel,
} from "./RolePermissionDetailsModel";
import { initRoleDetailsModel, RoleDetailsModel } from "./RoleDetailsModel";
import { initPermissionDetailsModel, PermissionDetailsModel } from "./PermissionsDetailsModel";
import { initUserRoleMappingModel, UserRoleMappingModel } from "./UserRoleMappingModel";

let sequelize: Sequelize;
const initAuroraDB = () => {
  const {
    AURORA_DB: { DATABASE, PORT, USERNAME, PASSWORD, HOST },
  } = getConfig();

  sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: PORT,
    logging: false,
    dialect: "mysql",
    dialectOptions: {
      maxPreparedStatements: 300,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });

  initConfigurationDetailsModel(sequelize);
  initUserDetailsModel(sequelize);
  initRolePermissionDetailsModel(sequelize);
  initRoleDetailsModel(sequelize);
  initPermissionDetailsModel(sequelize);
  initUserRoleMappingModel(sequelize);
};

export {
  initAuroraDB,
  sequelize,
  ConfigurationDetailsModel,
  UserDetailsModel,
  RolePermissionDetailsModel,
  RoleDetailsModel,
  PermissionDetailsModel,
  UserRoleMappingModel,
};
