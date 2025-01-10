import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserRequest } from '../../../common/types/interfaces/UserInterface';
import { COMMON_COLUMNS, SORT } from '../../../common/types/enums/CommonEnums';
import { getCustomLogger } from '../../../common/utils/Logger';
import { RoleDetailsModel, UserDetailsModel, UserRoleMappingModel } from '../../../common/models';

const logger = getCustomLogger('User::UserRepository');

export const fetchUsers = async (
  size: string,
  offset: string,
  keyWord = '',
  columnToSort: string = COMMON_COLUMNS.UPDATED_AT,
  sortingOrder: string = SORT.DESC,
) => {
  try {
    return await UserDetailsModel.findAndCountAll({
      attributes: { exclude: ['password'] },
      where: {
        [Op.or]: [
          {
            userName: {
              [Op.substring]: keyWord,
            },
          },
          {
            firstName: {
              [Op.substring]: keyWord,
            },
          },
          {
            lastName: {
              [Op.substring]: keyWord,
            },
          },
          {
            email: {
              [Op.substring]: keyWord,
            },
          },
        ],
        isActive: 1,
      },
      limit: parseInt(size),
      offset: parseInt(offset),
      order: [[columnToSort, sortingOrder]],
      raw: true,
    });
  } catch (error) {
    logger.error('Error while fetching users from db ', error);
    throw error;
  }
};

export const fetchUserByPrimaryKey = async (id: string) => {
  try {
    return await UserDetailsModel.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error('Error while fetching user by id from db ', error);
    throw error;
  }
};

export const addUserAndUserrole = async (userObject: {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  roleIds: string[];
}) => {
  try {
    const { userName, firstName, lastName, email, roleIds } = userObject;
    //ingesting the user data into user table
    const user = await UserDetailsModel.create({
      id: uuidv4(),
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    //gathering all the roles related to user
    const roles = await RoleDetailsModel.findAll({
      where: {
        id: roleIds,
      },
    });
    const { id: userId } = user;
    const userRoles = roles.map(({ id: roleId }) => ({
      id: uuidv4(),
      userId: userId,
      roleId: roleId,
    }));

    //ingesting the user and role data into userrole table
    return await UserRoleMappingModel.bulkCreate(userRoles);
  } catch (error) {
    logger.error('Error while adding user in db ', error);
    throw error;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    return await UserDetailsModel.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error('Error while deleting user ', error);
    throw error;
  }
};

export const updateUser = async (id: string, userObject: Partial<UpdateUserRequest>) => {
  try {
    return await UserDetailsModel.update(userObject, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error('Error while updating user ', error);
    throw error;
  }
};

export const fetchUserById = async (id: string) => {
  try {
    return await UserDetailsModel.findOne({
      attributes: { exclude: ['password'] },
      where: {
        Id: id,
      },
      raw: true,
    });
  } catch (error) {
    logger.error('Error while fetching user by email from db ', error);
    throw error;
  }
};
export function fetchUserIDMDetail(arg0: any, arg1: string): { hltrealfirstname: any; hltreallastname: any; idm: any; mail: any; } | PromiseLike<{ hltrealfirstname: any; hltreallastname: any; idm: any; mail: any; }> {
  throw new Error('Function not implemented.');
}

