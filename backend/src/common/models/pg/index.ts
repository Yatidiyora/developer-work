import { Sequelize } from 'sequelize';
import getConfig from '../../config/config';
import { initConfigurationDetailsModel, ConfigurationDetailsModel } from './ConfigurationDetailsModel';
import { initUserDetailsModel, UserDetailsModel } from './UserDetailsModel';
import { initRolePermissionDetailsModel, RolePermissionDetailsModel } from './RolePermissionDetailsModel';
import { initRoleDetailsModel, RoleDetailsModel } from './RoleDetailsModel';
import { initPermissionDetailsModel, PermissionDetailsModel } from './PermissionsDetailsModel';
import { initUserRoleMappingModel, UserRoleMappingModel } from './UserRoleMappingModel';

let sequelize: Sequelize;
const initPgDB = () => {
  const {
    PG_DB: { DATABASE, PORT, USERNAME, PASSWORD, HOST },
  } = getConfig();

  sequelize = new Sequelize('postgres', 'postgres', 'Y@ti2611', {
    host: 'localhost',
    port: 5432,
    logging: false,
    dialect: 'postgres',
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
  initPgDB as initAuroraDB,
  sequelize,
  ConfigurationDetailsModel,
  UserDetailsModel,
  RolePermissionDetailsModel,
  RoleDetailsModel,
  PermissionDetailsModel,
  UserRoleMappingModel,
};
