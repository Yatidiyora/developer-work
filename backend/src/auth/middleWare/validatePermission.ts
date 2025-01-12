import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE, STATUS_MESSAGE, ACTION, DB_MODELS } from '../../common/types/enums/CommonEnums';
import { RequestUser } from '../../common/types/interfaces/UserInterface';
import { RolePermissionDetailsModel, UserRoleMappingModel } from '../../common/models/pg';
import { DataConditions, GetAllDataResponse } from '../../common/types/interfaces/CommonDbTypes';
import { fetchDataFromTableObject } from '../../common/types/constants/DbObjectConstants';
import { commonDbExecution } from '../../common/service/DbService';

export const validatePermission = (module: string | string[], action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as RequestUser;
    // const roles = await fetchRoles(id);
    const rolesSource: DataConditions = fetchDataFromTableObject;
    rolesSource.modelName = DB_MODELS.UserRoleMappingModel;
    rolesSource.requiredWhereFields[0].conditionValue = {
      userId: id
    };
    const { dataObjects } = (await commonDbExecution(
      rolesSource,
    )) as GetAllDataResponse;
    const roles = dataObjects as UserRoleMappingModel[];
    const roleIds = roles.map((role) => role.roleId);
    rolesSource.modelName = DB_MODELS.RolePermissionDetailsModel;
        rolesSource.requiredWhereFields[0].conditionValue = {
          roleId: roleIds,
        };
        const { dataObjects: rolesPermissions } = (await commonDbExecution(
          rolesSource,
        )) as GetAllDataResponse;
    const permissions = rolesPermissions as RolePermissionDetailsModel[];
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
