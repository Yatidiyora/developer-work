import { AxiosError } from "axios";
// import { ToastService, ToastType } from '../view/common/TostModal';
import { BaseApi } from "./BaseApi";
import { SalesRevenuePayload } from "../common/types/interface/SalesRevenue";

class SalesRevenueApi extends BaseApi {
  private static instance: SalesRevenueApi;

  public static getSalesRevenueInstance() {
    if (!SalesRevenueApi.instance) {
      SalesRevenueApi.instance = new SalesRevenueApi();
    }
    return SalesRevenueApi.instance;
  }

  public async getSalesRevenue(payload: string) {
    try {
      const response = await this.post(
        `sales/sales-revenue`,
        JSON.parse(payload),
      );
      return response.data;
    } catch (error: AxiosError | any) {
      //   ToastService({ type: ToastType.ERROR, message: error.response.data.message });
      return error.response.data;
    }
  }
}

export default SalesRevenueApi;
