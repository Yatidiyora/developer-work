import React, { useState } from "react";
import CustomerDetailsComponent from "../../common/common-components/CustomerDetailsComponent";
import { DynamicDataTable } from "../../data-table/DynamicDataTable";
import OrderDetailsColumn from "./OrderDetailsColumn";
import { useToogle } from "../../../hooks/useToogle";

const CustomerOrdersReviewPage = () => {
  const [action, setAction] = useState<any>();
  const orderDetailsColumns = OrderDetailsColumn({ setAction });
  const { status, toogleStatus } = useToogle();
  const getCustomerOrders = async () => {
    return;
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
