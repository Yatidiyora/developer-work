export interface KeyValueString {
  [key: string]: string;
}
export interface KeyValueBool {
  [key: string]: boolean;
}

export interface SuccessResponse {
  message: string;
  status: string;
}

export interface KeyMultiTypeValue {
    [key: string]: any;
}

export type OptionType = {
  value: string;
  label: string;
};

export interface KeyValueAny {
  [key: string]: any;
}