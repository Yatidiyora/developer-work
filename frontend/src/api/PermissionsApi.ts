import { AxiosError } from 'axios';
import { BaseApi } from './BaseApi';
import { RolePermissionsResponse } from '../common/types/interface/RoleModal.interface';

class PermissionsApi extends BaseApi {
  private static instance: PermissionsApi;

  public async getPermissions() {
    try {
      const response = await this.get<RolePermissionsResponse>(`/permissions`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data;
    }
  }
  public async getAllRolePermissions() {
    try {
      const response = await this.get<RolePermissionsResponse>(`/permissions/all`);
      return response.data;
    } catch (error: AxiosError | any) {
      return error.response.data;
    }
  }

  public static getInstance() {
    if (!PermissionsApi.instance) {
      PermissionsApi.instance = new PermissionsApi();
    }
    return PermissionsApi.instance;
  }
}

export default PermissionsApi;
