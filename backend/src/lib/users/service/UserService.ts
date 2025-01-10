import * as Repository from '../repository/UserRepository';
import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { STATUS_MESSAGE, STATUS_CODE, ERROR } from '../../../common/types/enums/CommonEnums';
import { v4 as uuidv4 } from 'uuid';
import { RequestQuery } from '../../../common/types/interfaces/UserInterface';
import { getCustomLogger } from '../../../common/utils/Logger';
import { addUserRoleMapping, deleteUserRoleMapping, fetchRoles } from '../../user-roles/repository/UserRoleRepository';

const logger = getCustomLogger('User::UserService');

export const fetchAllUsers = async (req: Request, res: Response) => {
  const { size, offset, keyword, sortColumnName, sortOrder } = req.query as unknown as RequestQuery;
  try {
    const { count, rows } = await Repository.fetchUsers(size, offset, keyword, sortColumnName, sortOrder);
    res.status(STATUS_CODE.SUCCESS).json({ result: rows, total: count, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching users ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.USER_NOT_FETCHED, status: STATUS_MESSAGE.ERROR });
  }
};

export const fetchUserByUserName = async (req: Request, res: Response) => {
  const { keyword, size, offset } = req.query;
  try {
    const { count, rows } = await Repository.fetchUsers(size as string, offset as string, keyword as string);
    res.status(STATUS_CODE.SUCCESS).json({ result: rows, total: count, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching user by primary key ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.USER_NOT_FETCHED, status: STATUS_MESSAGE.ERROR });
  }
};

export const fetchUserByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const fetchedUserByPrimaryKey = await Repository.fetchUserByPrimaryKey(id);
    const rolesIds = await fetchRoles(id);
    if (!fetchedUserByPrimaryKey) {
      res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.USER_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
    }
    res
      .status(STATUS_CODE.SUCCESS)
      .json({ result: { user: fetchedUserByPrimaryKey, roles: rolesIds }, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while fetching user by primary key ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.USER_NOT_FETCHED, status: STATUS_MESSAGE.ERROR });
  }
};

export const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const userSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(50).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    roleIds: Joi.array().items(Joi.string()),
  });
  const { userName, firstName, lastName, email, roleIds } = req.body;

  const { error } = userSchema.validate({
    userName,
    firstName,
    lastName,
    email,
    roleIds,
  });
  if (error) {
    logger.error('Error validating user details ', error.details[0].message); //error.details[0].message
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: 'Please enter valid user details', status: STATUS_MESSAGE.ERROR });
    return;
  }
  next();
};

export const addUserAndUserroleToDb = async (req: Request, res: Response) => {
  try {
    await Repository.addUserAndUserrole(req.body);
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.USER_CREATED, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    if (error.name === ERROR.SEQUELIZE_UNIQUE_CONSTRAINT) {
      logger.error('User is already present ', error);
      res
        .status(STATUS_CODE.DATA_ALREADY_PRESENT)
        .json({ message: STATUS_MESSAGE.USER_IS_ALREADY_PRESENT, status: STATUS_MESSAGE.ERROR });
    }
    logger.error('Error while creating user ', error);
    res.status(STATUS_CODE.SERVER_ERROR).json({ message: STATUS_MESSAGE.USER_NOT_ADDED, status: STATUS_MESSAGE.ERROR });
  }
};

export const deleteUserFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Repository.deleteUserById(id);
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.USER_DELETED, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    if (error.name === ERROR.SEQUELIZE_VALIDATION) {
      logger.error('User not found ', error);
      res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.USER_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
    }
    logger.error('Error while deleting user ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.USER_NOT_DELETED, status: STATUS_MESSAGE.ERROR });
  }
};

export const updateUserToDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userName, firstName, lastName, email, roles } = req.body;
  try {
    const userObject = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    //Update the user
    await Repository.updateUser(id, userObject);

    if (roles) {
      //Fetching all the assigned roles and get the roleIds
      const rolesAndUsers = await fetchRoles(id);
      const roleIds = rolesAndUsers.map(({ roleId }) => roleId);

      //Get all the added and deleted roles if any
      const rolesToAdd = roles.filter((role: string) => !roleIds.includes(role));
      const rolesToDelete = roleIds.filter((role) => !roles.includes(role));

      //Add and delete all the userRoleMapping if needed
      await deleteUserRoleMapping(id, rolesToDelete);
      rolesToAdd.map(async (role: string) => {
        await addUserRoleMapping({ id: uuidv4(), userId: id, roleId: role });
      });
    }
    res.status(STATUS_CODE.SUCCESS).json({ message: STATUS_MESSAGE.USER_UPDATED, status: STATUS_MESSAGE.SUCCESS });
  } catch (error) {
    logger.error('Error while deleting user ', error);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ message: STATUS_MESSAGE.USER_NOT_UPDATED, status: STATUS_MESSAGE.ERROR });
  }
};
