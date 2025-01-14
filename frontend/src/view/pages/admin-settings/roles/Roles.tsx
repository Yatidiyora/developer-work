import React, { useEffect, useState } from "react";
import { DynamicDataTable } from "../../../data-table/DynamicDataTable";
import ManageUserApi from "../../../../api/ManageUserApi";
import { trackPromise } from "react-promise-tracker";
import { useToogle } from "../../../../hooks/useToogle";
import RolesColumns from "./RolesColumns";
import ManageRoleApi from "../../../../api/ManageRoleApi";

const Roles = () => {
  const [action, setAction] = useState<{
    user: any;
    actionType: any;
  }>();
  const roleColumn = RolesColumns({ setAction });
  const { status, toogleStatus } = useToogle();

  const roleInstance = ManageRoleApi.getManageRoleInstance();

  const getRoles = async (
    keyword: string | null,
    size: number,
    offset: number,
    colName: string,
    sort: string
  ) => {
    return await trackPromise(
      roleInstance.getRoles(size, offset, keyword, colName, sort)
    );
  };
  return (
    <div className="user-management">
      {/* Page Header */}
      <div className="user-management-header">
        <h2>Roles Management</h2>
        <button className="add-user-btn">+ Add New</button>
      </div>

      {/* Table Container (Dynamic Content) */}
      <div className="user-table-container">
        {/* Your dynamic table component will go here */}
        <DynamicDataTable
          columns={roleColumn}
          tableDataGetApi={getRoles}
          filterDefaultText={"Search By User Name / Email"}
          reRender={status}
        />
      </div>
    </div>
  );
};

export default Roles;
