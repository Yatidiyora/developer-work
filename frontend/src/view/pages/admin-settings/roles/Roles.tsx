import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ManageRoleApi from "../../../../api/ManageRoleApi";
import { ACTION_TYPE } from "../../../../common/types/enum/CommonEnum";
import { useToogle } from "../../../../hooks/useToogle";
import RoleModal from "../../../common/modals/RoleModal";
import { DynamicDataTable } from "../../../data-table/DynamicDataTable";
import RolesColumns from "./RolesColumns";

const Roles = () => {
  const [action, setAction] = useState<{
    role: any;
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
    <div className="containt-management">
    {/* Page Header */}
    <div className="containt-management-header">
        <h2>Roles Management</h2>
        <button className="add-user-btn">+ Add New</button>
      </div>
      <div>
        {(action?.actionType === ACTION_TYPE.EDIT ||
          action?.actionType === ACTION_TYPE.ADD) && (
          <RoleModal
            action={action}
            setAction={setAction}
            stateChange={toogleStatus}
            modalTitle={
              action.actionType === ACTION_TYPE.EDIT ? "Edit Role" : "Add Role"
            }
          />
        )}
      </div>
      {/* Table Container (Dynamic Content) */}
      <div className="containt-table-container">
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
