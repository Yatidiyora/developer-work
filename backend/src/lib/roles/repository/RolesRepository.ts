
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { RolePermission } from '../../../common/types/interfaces/RolePermission';
import { COMMON_COLUMNS, SORT } from '../../../common/types/enums/CommonEnums';
import { getCustomLogger } from '../../../common/utils/Logger';
import { RolePermissionDetailsModel } from '../../../common/models/RolePermissionDetailsModel';
import { RoleDetailsModel } from '../../../common/models/RoleDetailsModel';

const logger = getCustomLogger('Role::RolesRepository');

export const fetchRoles = async (
  size: string,
  offset: string,
  keyword = '',
  columnToSort: string = COMMON_COLUMNS.UPDATED_AT,
  sortingOrder: string = SORT.DESC,
) => {
  try {
    return await RoleDetailsModel.findAndCountAll({
      where: {
        name: {
          [Op.substring]: keyword,
        },
      },
      limit: parseInt(size),
      offset: parseInt(offset),
      order: [[columnToSort, sortingOrder]],
      raw: true,
    });
  } catch (error) {
    logger.error('Error while fetching roles from db ', error);
    throw error;
  }
};

export const fetchRoleByPrimaryKey = async (id: string) => {
  try {
    return await RoleDetailsModel.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error('Error while fetching role by id from db ', error);
    throw error;
  }
};

export const addRole = async (name: string, permissions: RolePermission[]) => {
  const rolePermissionId = uuidv4();
  try {
    //ingesting the role data into role table
    await RoleDetailsModel.create({
      id: rolePermissionId,
      name: name,
      description: name,
    });

    const newRolePermissions = permissions.map(({ permissionId, permissionName, view, edit, delete: isDelete }) => ({
      roleId: rolePermissionId,
      permissionId: permissionId,
      permissionName: permissionName,
      view: view,
      edit: edit,
      delete: isDelete,
    }));
    return await RolePermissionDetailsModel.bulkCreate(newRolePermissions);
  } catch (error) {
    logger.error('Error while adding role in db ', error);
    throw error;
  }
};

export const deleteRoleById = async (id: string) => {
  try {
    return await RoleDetailsModel.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error('Error while deleting role from db', error);
    throw error;
  }
};

export const updateRole = async (id: string, roleNme: string, permissions: RolePermissionDetailsModel[]) => {
  try {
    await RoleDetailsModel.update(
      { name: roleNme },
      {
        where: {
          id: id,
        },
      },
    );
    for (const permission of permissions) {
      let { roleId } = permission;
      const { permissionId, view, edit, delete: isDelete } = permission;
      if (!roleId) roleId = id;
      const [fetchedAgentSchedule, created] = await RolePermissionDetailsModel.findOrCreate({
        where: {
          roleId: roleId,
          permissionId: permissionId,
        },
        defaults: { ...permission },
      });

      if (!created) {
        await RolePermissionDetailsModel.update(
          { view: view, edit: edit, delete: isDelete },
          {
            where: {
              roleId: fetchedAgentSchedule.roleId,
              permissionId: permissionId,
            },
          },
        );
      }
    }
  } catch (error) {
    logger.error('Error while updating role ', error);
    throw error;
  }
};
