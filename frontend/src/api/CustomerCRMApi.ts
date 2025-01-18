import { AxiosError } from 'axios';
// import { ToastService, ToastType } from '../view/common/TostModal';
import { BaseApi } from './BaseApi';

class CustomerCRMApi extends BaseApi {
  private static instance: CustomerCRMApi;

  public static getCustomerCRMInstance() {
    if (!CustomerCRMApi.instance) {
      CustomerCRMApi.instance = new CustomerCRMApi();
    }
    return CustomerCRMApi.instance;
  }

  public async getCRMCustomers(size: number, 
    offset: number, 
    keyword?: string | null, 
    colName?: string, 
    sort?: string) {
    try {
      const response = await this.get(
        `/customer?size=${size}&offset=${offset}` + 
        `${keyword ? `&keyword=${keyword}`: ''}` +
        `${colName ? `&sortColumnName=${colName}`: ''}` +
        `${sort ? `&sortOrder=${sort}`: ''}`,
      );
      return response.data;
    } catch (error: AxiosError | any) {
    //   ToastService({ type: ToastType.ERROR, message: error.response.data.message });
      return error.response.data;
    }
  }
}

export default CustomerCRMApi;
