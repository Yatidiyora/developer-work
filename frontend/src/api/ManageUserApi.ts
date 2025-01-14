import { AxiosError } from 'axios';
import { BaseApi } from './BaseApi';
import { ToastService, ToastType } from '../view/common/modals/TostModal';

class ManageUserApi extends BaseApi {
  private static instance: ManageUserApi;

  public static getManageUserInstance() {
    if (!ManageUserApi.instance) {
      ManageUserApi.instance = new ManageUserApi();
    }
    return ManageUserApi.instance;
  }

  public async getUsers() {
    try {
      const response = await this.get(
        `/users`,
      );
      return response.data;
    } catch (error: AxiosError | any) {
      ToastService({ type: ToastType.ERROR, message: error.response.data.message });
      return error.response.data;
    }
  }
}

export default ManageUserApi;
