import React, { useMemo, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ManageRoleApi from "../../../../api/ManageRoleApi";
import { ACTION_TYPE } from "../../../../common/types/enum/CommonEnum";
import { useToogle } from "../../../../hooks/useToogle";
import RoleModal from "../../../common/modals/RoleModal";
import { DynamicDataTable } from "../../../data-table/DynamicDataTable";
import RolesColumns from "./RolesColumns";
import { initialRole } from "../../../../common/types/constants/CommonConstants";
import DeleteModal from "../../../common/modals/DeleteModal";
import { Role, RoleActionState } from "../../../../common/types/interface/RoleModal.interface";

const Roles = () => {
  const [action, setAction] = useState<RoleActionState>();
  const roleColumn = RolesColumns({ setAction });
  const { status, toogleStatus } = useToogle();

  const roleInstance = ManageRoleApi.getManageRoleInstance();

  const DeleteModalSource = useMemo(() => {
      return <div>
        <p>Are you sure you want to delete this role!</p>
      </div>;
    }, [action?.role]);

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
  const deleteRole = async (id: string) => {
      return await trackPromise(
        roleInstance.deleteRoleById(id)
      );
    }
  const addRoleModel = () => {
      setAction({ role: initialRole, actionType: ACTION_TYPE.ADD, roleDelete: false, roleDeleteId: "" });
    };
  return (
    <div className="containt-management">
    {/* Page Header */}
    <div className="containt-management-header">
        <h2>Roles Management</h2>
        <button onClick={addRoleModel} className="add-user-btn">+ Add New</button>
      </div>
      <div>
        {(action?.actionType === ACTION_TYPE.EDIT ||
          action?.actionType === ACTION_TYPE.ADD) && (
          <RoleModal
            action={action}
            setAction={setAction}
            stateChange={toogleStatus}
            modalTitle={
              action.actionType === ACTION_TYPE.EDIT ? "Edit Role" : "Add New Role"
            }
          />
        )}
        {action?.actionType === ACTION_TYPE.DELETE && (
          <DeleteModal
            action={action}
            setAction={setAction}
            stateChange={toogleStatus}
            actionTitle={"roleDelete"}
            modalHeading={"Delete Role"}
            modalSubHeading={action.role.name}
            renderFieldComponent={DeleteModalSource}
            actionFun={deleteRole}
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
