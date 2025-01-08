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

  public async getCRMCustomers() {
    try {
      const response = await this.get(
        `/customers`,
      );
      return response.data;
    } catch (error: AxiosError | any) {
    //   ToastService({ type: ToastType.ERROR, message: error.response.data.message });
      return error.response.data;
    }
  }
}

export default CustomerCRMApi;
