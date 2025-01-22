import { AxiosError } from 'axios';
import { BaseApi } from './BaseApi';
import { ToastService, ToastType } from '../view/common/modals/TostModal';
import { GetUserById } from '../common/types/interface/UserModal.interface';
import { SuccessResponse } from '../common/types/interface/Common.interface';

class ManageUserApi extends BaseApi {
  private static instance: ManageUserApi;

  public static getManageUserInstance() {
    if (!ManageUserApi.instance) {
      ManageUserApi.instance = new ManageUserApi();
    }
    return ManageUserApi.instance;
  }

  public async getUsers(
    size: number, 
    offset: number, 
    keyword?: string | null, 
    colName?: string, 
    sort?: string
  ) {
    try {
      const response = await this.get(
        `/user?size=${size}&offset=${offset}` + 
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

  public async getUserById(id: string | undefined): Promise<GetUserById> {
    try {
      const response = await this.get<GetUserById>(`/user/${id}`);
      return response.data;
    } catch (error: AxiosError | any) {
      ToastService({ type: ToastType.ERROR, message: error.response.data });
      return error.response.data;
    }
  }

  public async addNewUser(payload: string) {
    try {
      const messageSuccess = 'User created successfully';
      const response = await this.post<SuccessResponse>('/user', JSON.parse(payload));
      ToastService({
        type: ToastType.SUCCESS,
        message: messageSuccess,
      });
      return response.data;
    } catch (error: AxiosError | any) {
      ToastService({ type: ToastType.ERROR, message: error.response.data });
      return null;
    }
  }

  public async updateUser(id: string, payload: string) {
    const messageSuccess = 'User updated successfully';
    try {
      const response = await this.post<SuccessResponse>(`/user/${id}`, JSON.parse(payload));
      ToastService({
        type: ToastType.SUCCESS,
        message: messageSuccess,
      });
      return response.data;
    } catch (error: AxiosError | any) {
      ToastService({ type: ToastType.ERROR, message: error.response.data });
      return null;
    }
  }

  public async deleteUserById(id: string) {
    try {
      const response = await this.delete<SuccessResponse>(`user/${id}`);
      ToastService({ type: ToastType.SUCCESS, message: response.data.message || "User Deleted Successfully" });
      return response.data;
    } catch (error: AxiosError | any) {
      ToastService({ type: ToastType.ERROR, message: error.response.data || "Failed To Deleted User"});
      return error.response.data;
    }
  }
}

export default ManageUserApi;
