import { ACTION_TYPE } from "../enum/CommonEnum";

export interface UserRole {
  name: string;
  id: string;
}

export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: number;
  tokenMaxAge: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolesByUserId {
  id: string;
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserById {
  user: User;
  roles: RolesByUserId[];
  status: string;
}

export interface GetUserById {
  result: UserById;
  status: string;
}

export interface UserModalProps {
  action: {
    user: User;
    actionType: ACTION_TYPE;
  };
  setAction: React.Dispatch<
    React.SetStateAction<
      | {
          user: User;
          actionType: ACTION_TYPE;
        }
      | undefined
    >
  >;
  stateChange: () => void;
  modalTitle: string;
}
