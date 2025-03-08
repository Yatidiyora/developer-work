import { DATE_CATEGORY_TYPE } from "../enum/CommonEnum";

export interface SalesRevenueDateCategory {
  categoryType: DATE_CATEGORY_TYPE;
  rangeValue: string | string[];
}

export interface SalesRevenuePayload {
  orderCategoryType?: string;
  subCategoryType?: string;
  dateCategory?: SalesRevenueDateCategory;
}
