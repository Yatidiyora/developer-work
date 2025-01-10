
import { RolePermissionDetailsModel } from '../../../common/models/RolePermissionDetailsModel';

import { Op } from 'sequelize';
import { getCustomLogger } from '../../../common/utils/Logger';
import { PermissionDetailsModel } from '../../../common/models/PermissionsDetailsModel';

const logger = getCustomLogger('RolePermission::RolePermissionRepository');

export const fetchPermissions = async (roleId: string[]) => {
  try {
    return await RolePermissionDetailsModel.findAll({
      where: {
        roleId: {
          [Op.in]: roleId,
        },
      },
      raw: true,
    });
  } catch (error) {
    logger.info('Error while fetching role permission');
  }
};
export const fetchAvailablePermissions = async () => {
  try {
    return await PermissionDetailsModel.findAll();
  } catch (error) {
    logger.error('Error while fetching role permissions', error.message || error.stack || error);
    throw error;
  }
};
export const deleteAssignedRolePermissionsById = async (roleId: string) => {
  try {
    return await RolePermissionDetailsModel.destroy({
      where: {
        roleId: roleId,
      },
    });
  } catch (error) {
    logger.error('Error while deleting Role Permissions', error);
    throw error;
  }
};
