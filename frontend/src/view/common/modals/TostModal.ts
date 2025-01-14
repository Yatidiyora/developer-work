import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastDetails } from '../../../common/types/interface/ToastComponent.types';
import { ToastType } from '../../../common/types/enum/CommonEnum';


export const ToastService = (props: ToastDetails) => {
  const { message, showTime = 3000, type } = props;
  switch (type) {
    case ToastType.SUCCESS:
      toast.success(message, {
        position: 'top-center',
        autoClose: showTime,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      break;
    case ToastType.ERROR:
      toast.error(message, {
        position: 'top-center',
        autoClose: showTime,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      break;
    default:
      break;
  }
};

export { ToastType };
