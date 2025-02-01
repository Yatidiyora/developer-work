import React from 'react';
import { ACTION_TYPE } from "../enum/CommonEnum";

export interface Role {
  id: string;
  name: string;
  permissions?: RolePermissions[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface RoleActionState {
  role: Role;
  actionType: ACTION_TYPE;
  roleDelete: boolean;
  roleDeleteId: string;
}
export interface GetRolesResponse {
  result: Role[];
  total: number;
  status: string;
}

export interface RolePermissions {
  id: string;
  permissionId: string;
  roleId?: string;
  name: string;
  permissionName: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

export interface PermissionsType {
  [key: string]: {
    name: string;
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export interface TogglerType {
  availablePermissions: PermissionsType;
  assignedPermissions: PermissionsType;
}

export interface RoleModalProps {
  action: RoleActionState;
  setAction: React.Dispatch<
    React.SetStateAction<
      | RoleActionState
      | undefined
    >
  >;
  stateChange: () => void;
  modalTitle: string;
}

export interface RolePermissionsResponse {
  result: RolePermissions[];
  status: string;
}

export interface RoleById {
  result: Role;
  status: string;
}
