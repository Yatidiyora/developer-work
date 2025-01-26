import { ToastType } from "../enum/CommonEnum";

export interface ToastDetails {
  type: ToastType;
  message: string;
  showTime?: number;
}
