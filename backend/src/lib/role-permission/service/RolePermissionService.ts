import { Request, Response } from 'express';
import { STATUS_CODE, STATUS_MESSAGE } from '../../../common/types/enums/CommonEnums';
import { getCustomLogger } from '../../../common/utils/logger';
import { fetchAvailablePermissions, fetchPermissions } from '../repository/RolePermissionRepository';
import { RequestUser } from '../../../common/types/interfaces/UserInterface';
import { fetchRoles } from '../../UserRole/Repository/UserRoleRepository';

const logger = getCustomLogger('RolePermission::RolePermissionService');

export const fetchPermissionsFromUserId = async (req: Request, res: Response) => {
  const { id } = req.user as RequestUser;
  try {
    const roles = await fetchRoles(id);
    const roleIds: string[] = roles.map((role) => role.roleId);
    const permissions = await fetchPermissions(roleIds);
    logger.info('Role permissions fetched successfully!');
    res.status(STATUS_CODE.SUCCESS).json({ result: permissions, status: STATUS_CODE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching the permissions', error.message || error.stack || error);
    res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ message: STATUS_MESSAGE.PERMISSIONS_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
  }
};
export const fetchAllRolesPermissions = async (req: Request, res: Response) => {
  try {
    const allPermissions = await fetchAvailablePermissions();
    logger.info('Roles All Permissions fetched successfully!');
    res.status(STATUS_CODE.SUCCESS).json({ result: allPermissions, status: STATUS_CODE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching all the available permissions', error.message || error.stack || error);
    res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ message: STATUS_MESSAGE.PERMISSIONS_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
  }
};
