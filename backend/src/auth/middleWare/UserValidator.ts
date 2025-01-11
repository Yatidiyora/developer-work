import { STATUS_CODE } from '../../common/types/enums/CommonEnums';
import * as Repository from '../../lib/users/repository/UserRepository';
import { Request } from 'express';

export const validateUser = async (req: Request) => {
  const { id } = req.body;
  const user = await Repository.fetchUserById(id);
  if (!user) {
    return STATUS_CODE.NOT_FOUND;
  }
  return user;
};
