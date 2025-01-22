export enum ToastType {
    SUCCESS,
    ERROR,
    WARN,
  }

export enum ACTION_TYPE {
  EDIT = 'EDIT',
  ADD = 'ADD',
  DELETE = 'DELETE',
  REVIEW = 'REVIEW',
}

export enum FORMAT {
  DATE = 'YYYY-MM-DD',
  S3_DATE = 'YYYY/MM/DD',
  REVERSE_DATE = 'DD-MM-YYYY',
  START_MONTH_DATE = 'MM-DD-YYYY',
  DAY = 'day',
  MILLISECONDS = 'milliseconds',
  MINUTE = 'minutes',
  HOURS = 'hours',
  SECONDS = 'seconds',
  UNI_FOCUS_DATE = 'YYYY-MM-DDTHH:mm:ss',
  MM = 'mm',
  SS = 'ss',
  NORAML_DATE = 'YYYY-MM-DD HH:mm:ss',
  HH_MM = 'HH:mm',
  DAYS = 'days',
  SFTP_DATE = 'MM/DD/YYYY',
  ONLY_DATE = 'date',
  MONTH = 'month',
  ZIP_FORMAT = 'YYYY_MM_DDTHH_mm_ss',
  YEARS = 'years',
  X_PADDING_HOURS = 'H:mm',
  JSON = 'YYYYMMDDHHmmss',
  S3_FOLDER_STRUCTURE = 'YYYY/MM',
}

export enum TOGGER_PERMISSION_TYPE {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

export enum RoutesPath {
  LOGIN = '/login',
  HOME = '/',
  CUSTOMER_ORDER_REVIEW = '/customer-crm/order-review'
}

export enum PERMISSION_TYPES {
  CUSTOMER_ORDER_REVIEW = 'customerOrderReview'
}