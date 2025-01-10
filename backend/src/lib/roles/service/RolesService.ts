import { Request, Response } from 'express';
import { STATUS_MESSAGE, ERROR, STATUS_CODE } from '../../../common/types/enums/CommonEnums';
import * as RoleRepository from '../repository/RolesRepository';
import * as RolePermissionRepository from '../../role-permission/repository/RolePermissionRepository';
import { RolePermissionsById } from '../../../common/types/interfaces/RolePermission';
import { getCustomLogger } from '../../../common/utils/Logger';
import { fetchPermissions } from '../../role-permission/repository/RolePermissionRepository';
import { RequestQuery } from '../../../common/types/interfaces/UserInterface';

const logger = getCustomLogger('Role::RolesService');

export const fetchAllRoles = async (req: Request, res: Response) => {
  const { size, offset, sortColumnName, sortOrder, keyword } = req.query as unknown as RequestQuery;
  try {
    const { count, rows } = await RoleRepository.fetchRoles(size, offset, keyword, sortColumnName, sortOrder);
    res.status(STATUS_CODE.SUCCESS).json({ result: rows, total: count, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching roles ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.ROLE_NOT_FETCHED, status: STATUS_MESSAGE.ERROR });
  }
};

export const fetchRoleByRoleName = async (req: Request, res: Response) => {
  const { keyword, size, offset } = req.query;
  try {
    const { count, rows } = await RoleRepository.fetchRoles(size as string, offset as string, keyword as string);
    res.status(STATUS_CODE.SUCCESS).json({ result: rows, total: count, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching role by primary key ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.ROLE_NOT_FETCHED, status: STATUS_MESSAGE.ERROR });
  }
};

export const fetchRoleByRoleId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const fetchedRoleByPrimaryKey = await RoleRepository.fetchRoleByPrimaryKey(id);
    if (!fetchedRoleByPrimaryKey) {
      res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.ROLE_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
      return;
    }
    const roleAssignedPermissions = await fetchPermissions([id]);
    const { id: roleId, name, createdAt, updatedAt } = fetchedRoleByPrimaryKey;
    const rolePermissionByRoleIdResponse: RolePermissionsById = {
      id: roleId,
      name: name,
      permissions: roleAssignedPermissions ?? [],
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
    res.status(STATUS_CODE.SUCCESS).json({ result: rolePermissionByRoleIdResponse, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching role by primary key ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.ROLE_NOT_FETCHED, status: STATUS_MESSAGE.ERROR });
  }
};

export const addRoleToDb = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  try {
    if (!name) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ message: STATUS_MESSAGE.ROLE_NAME_NOT_PRESENT, status: STATUS_MESSAGE.ERROR });
    }
    await RoleRepository.addRole(name, permissions);
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.ROLE_CREATED, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    if (error.name === ERROR.SEQUELIZE_UNIQUE_CONSTRAINT) {
      logger.error('Role is already present ', error);
      res
        .status(STATUS_CODE.DATA_ALREADY_PRESENT)
        .json({ message: STATUS_MESSAGE.ROLE_IS_ALREADY_PRESENT, status: STATUS_MESSAGE.ERROR });
      return;
    }
    logger.error('Error while creating role ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.ROLE_NOT_CREATED, status: STATUS_MESSAGE.ERROR });
  }
};

export const deleteRoleFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await RoleRepository.deleteRoleById(id);
    await RolePermissionRepository.deleteAssignedRolePermissionsById(id);
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.ROLE_DELETED, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    if (error.name === ERROR.SEQUELIZE_VALIDATION) {
      logger.error('Role not found ', error);
      res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.ROLE_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
    }
    logger.error('Error while deleting role ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.ROLE_NOT_DELETED, status: STATUS_MESSAGE.ERROR });
  }
};

export const updateRoleToDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  try {
    await RoleRepository.updateRole(id, name, permissions);
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.ROLE_UPDATED, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while deleting user ', error);
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.ROLE_NOT_UPDATED, status: STATUS_MESSAGE.ERROR });
  }
};
