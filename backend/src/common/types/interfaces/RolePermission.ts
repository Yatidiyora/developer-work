import { RolePermissionDetailsModel } from "../../models";

export interface RolePermission {
  roleId?: string;
  permissionId: string;
  permissionName: string;
  view: number;
  edit: number;
  delete: number;
}
export interface RolePermissionsById {
  id: number;
  name: string;
  permissions: RolePermissionDetailsModel[];
  createdAt: Date;
  updatedAt: Date;
}
