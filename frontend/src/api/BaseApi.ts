import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// import { getCookie, removeCookie } from 'typescript-cookie';
// import { WFM_SYNC_BANYAN_AUTH_TOKEN_ID } from '../utils/constants/RoutesPath';
import getConfig from '../common/config/Config';
import { getCookie } from 'typescript-cookie';

console.log('getConfig().BACKEND.BACKEND_API: ', getConfig().BACKEND.BACKEND_API);


export class BaseApi {
  private axiosInstance: AxiosInstance;
  private baseURL = getConfig().BACKEND.BACKEND_API;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });

    this.axiosInstance.interceptors.request.use(this.handleRequest);
    this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private async handleRequest(
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    // You can customize the request config here, for example by adding an authentication token to the headers.
    config.headers['token'] = [getCookie(getConfig().FRONTEND.DELELOPER_WORK_AUTH_TOKEN_ID)];
    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    // You can customize the response handling here, for example by logging the response or transforming the data.
    return response;
  }

  private handleError(error: AxiosError): Promise<AxiosError> {
    // You can customize the error handling here, for example by displaying a user-friendly error message or redirecting to an error page.
    if (error.response?.status === 401) {
      // if (window.location.hostname === 'localhost') {
      //   removeCookie(WFM_SYNC_BANYAN_AUTH_TOKEN_ID);
      // } else {
      //   removeCookie(WFM_SYNC_BANYAN_AUTH_TOKEN_ID);
      //   window.location.replace(VARIABLES.BASE_API.LOGIN_URL);
      // }
    }
    return Promise.reject(error);
  }

  protected get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  protected post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  protected put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  protected delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}
