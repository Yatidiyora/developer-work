import React, { useState } from "react";
import CustomerDetailsComponent from "../../common/common-components/CustomerDetailsComponent";
import { DynamicDataTable } from "../../data-table/DynamicDataTable";
import OrderDetailsColumn from "./OrderDetailsColumn";
import { useToogle } from "../../../hooks/useToogle";
import CustomerCRMApi from "../../../api/CustomerCRMApi";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";

const CustomerOrdersReviewPage = () => {
  const { id: customerId } = useParams();
  const [action, setAction] = useState<any>();
  const orderDetailsColumns = OrderDetailsColumn({ setAction });
  const { status, toogleStatus } = useToogle();
  const customerCRMInstance = CustomerCRMApi.getCustomerCRMInstance();
  const getCustomerOrders = async (
    keyword: string | null,
    size: number,
    offset: number,
    colName: string,
    sort: string
  ) => {
    return await trackPromise(
      customerCRMInstance.getCRMCustomerOrders(
        customerId,
        size,
        offset,
        keyword,
        colName,
        sort
      )
    );
  };
  return (
    <div className="containt-management">
      <CustomerDetailsComponent />
      <div className="containt-table-container">
        {/* Your dynamic table component will go here */}
        <DynamicDataTable
          columns={orderDetailsColumns}
          tableDataGetApi={getCustomerOrders}
          filterDefaultText={"Search By Order Name / Order Type"}
          reRender={status}
        />
      </div>
    </div>
  );
};

export default CustomerOrdersReviewPage;
