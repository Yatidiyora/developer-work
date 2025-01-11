import { Op } from 'sequelize';
import { UserRoleMapping } from '../../../common/types/interfaces/UserInterface';
import { UserRoleMappingModel } from '../../../common/models/pg/UserRoleMappingModel';
import { getCustomLogger } from '../../../common/utils/Logger';

const logger = getCustomLogger('UserRole::UserRoleRepository');

export const fetchRoles = async (userId: string): Promise<UserRoleMappingModel[]> => {
  try {
    return await UserRoleMappingModel.findAll({
      where: {
        userId: userId,
      },
      raw: true,
    });
  } catch (error) {
    logger.error('Failed to get roles from user id', error.message || error.stack || error);
    throw error;
  }
};

export const deleteUserRoleMapping = async (userId: string, roles: string[]) => {
  try {
    return await UserRoleMappingModel.destroy({
      where: {
        userId: userId,
        roleId: {
          [Op.in]: roles,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to delete user role mappings', error.message || error.stack || error);
    throw error;
  }
};

export const addUserRoleMapping = async (userRole: Partial<UserRoleMapping>) => {
  try {
    return await UserRoleMappingModel.create(userRole);
  } catch (error) {
    logger.error('Failed to add user role mappings', error.message || error.stack || error);
    throw error;
  }
};
