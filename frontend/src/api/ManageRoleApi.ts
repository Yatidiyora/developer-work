import { AxiosError } from 'axios';
import { BaseApi } from './BaseApi';
import { ToastService, ToastType } from '../view/common/modals/TostModal';

class ManageRoleApi extends BaseApi {
  private static instance: ManageRoleApi;

  public static getManageRoleInstance() {
    if (!ManageRoleApi.instance) {
      ManageRoleApi.instance = new ManageRoleApi();
    }
    return ManageRoleApi.instance;
  }

  public async getRoles(
    size: number, 
    offset: number, 
    keyword?: string | null, 
    colName?: string, 
    sort?: string
  ) {
    try {
      const response = await this.get(
        `/role?size=${size}&offset=${offset}` + 
        `${keyword ? `&keyword=${keyword}`: ''}` +
        `${colName ? `&sortColumnName=${colName}`: ''}` +
        `${sort ? `&sortOrder=${sort}`: ''}`,
      );
      return response.data;
    } catch (error: AxiosError | any) {
      ToastService({ type: ToastType.ERROR, message: error.response.data.message });
      return error.response.data;
    }
  }
}

export default ManageRoleApi;
