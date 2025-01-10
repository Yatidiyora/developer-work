import * as Repository from '../repository/UserRoleRepository';
import { Request, Response } from 'express';
import { RequestUser } from '../../../common/types/interfaces/UserInterface';
import { STATUS_CODE, STATUS_MESSAGE } from '../../../common/types/enums/CommonEnums';
import { getCustomLogger } from '../../../common/utils/Logger';

const logger = getCustomLogger('UserRole::UserRoleService');

interface AuthenticatedRequest extends Request {
  user: { id: string }; // Define 'user' with an 'id' property
}

export const fetchRolesByUserId = async (req: AuthenticatedRequest , res: Response) => {
  const { id } = req.user as RequestUser;
  try {
    const roles = await Repository.fetchRoles(id);
    res.status(STATUS_CODE.SUCCESS).json({ result: roles, status: STATUS_CODE.SUCCESS });
  } catch (error) {
    logger.error('Failed to get roles by user id', error.message || error.stack || error);
    res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.ROLE_NOT_FOUND, status: STATUS_MESSAGE.ERROR });
  }
};
