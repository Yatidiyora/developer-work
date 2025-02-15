import React from "react";
import { PERMISSION_TYPES, RoutesPath } from "./common/types/enum/CommonEnum";
import CustomerOrdersReviewPage from "./view/pages/cstomer-crm/CustomerOrdersReviewPage";


export const routes: {
  routeType: string;
  path: string;
  element: any;
}[] = [
  {
    routeType: PERMISSION_TYPES.CUSTOMER_ORDER_REVIEW,
    path: RoutesPath.CUSTOMER_ORDER_REVIEW,
    element: <CustomerOrdersReviewPage />,
  },
];
