import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE, STATUS_MESSAGE, ACTION } from '../../common/types/enums/CommonEnums';
import { RequestUser } from '../../common/types/interfaces/UserInterface';
import { fetchRoles } from '../../lib/user-roles/repository/UserRoleRepository';
import { RolePermissionDetailsModel } from '../../common/models/pg';
import { fetchPermissions } from '../../lib/role-permission/repository/RolePermissionRepository';

export const validatePermission = (module: string | string[], action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as RequestUser;
    const roles = await fetchRoles(id);
    const roleIds = roles.map((role) => role.roleId);
    const permissions = await fetchPermissions(roleIds);
    if (typeof module === 'string') {
      if (validatePermissionForUser(action, permissions, module)) {
        next();
        return;
      }
    } else {
      for (const page of module) {
        if (validatePermissionForUser(action, permissions, page)) {
          next();
          return;
        }
      }
    }

    res.status(STATUS_CODE.UNAUTHORIZED).json({ message: STATUS_MESSAGE.UNAUTHORIZED, status: STATUS_MESSAGE.ERROR });
  };
};

const validatePermissionForUser = (
  action: string,
  permissions: RolePermissionDetailsModel[],
  module: string,
): boolean => {
  let canChange = false;
  const userPermissions = permissions.filter((permission) => permission.permissionName === module);

  if (action === ACTION.VIEW) {
    userPermissions.forEach((userPermission) => {
      if (userPermission.view === 1) {
        canChange = true;
      }
    });
  }

  if (action === ACTION.UPDATE) {
    userPermissions.forEach((userPermission) => {
      if (userPermission.edit === 1) {
        canChange = true;
      }
    });
  }

  if (action === ACTION.DELETE) {
    userPermissions.forEach((userPermission) => {
      if (userPermission.delete === 1) {
        canChange = true;
      }
    });
  }

  return canChange;
};
