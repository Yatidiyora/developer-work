import React, { useEffect, useState } from "react";
import { DynamicDataTable } from "../../../data-table/DynamicDataTable";
import userColumns from "./UsersColumns";
import ManageUserApi from "../../../../api/ManageUserApi";
import { trackPromise } from "react-promise-tracker";
import { useToogle } from "../../../../hooks/useToogle";
import { ACTION_TYPE } from "../../../../common/types/enum/CommonEnum";
import UserModal from "../../../common/modals/UserModal";
import { User } from "../../../../common/types/interface/UserModal.interface";
import { initialUser } from "../../../../common/types/constants/CommonConstants";

const Users = () => {
  const [action, setAction] = useState<{
    user: User;
    actionType: ACTION_TYPE;
  }>();
  const userColumn = userColumns({ setAction });
  const { status, toogleStatus } = useToogle();

  const userInstance = ManageUserApi.getManageUserInstance();

  const getUsers = async (
    keyword: string | null,
    size: number,
    offset: number,
    colName: string,
    sort: string
  ) => {
    return await trackPromise(
      userInstance.getUsers(size, offset, keyword, colName, sort)
    );
  };

  const addUserModel = () => {
    setAction({ user: initialUser, actionType: ACTION_TYPE.ADD });
  };
  return (
    <div className="containt-management">
      {/* Page Header */}
      <div className="containt-management-header">
        <h2>Users Management</h2>
        <button onClick={addUserModel} className="add-user-btn">
          + Add New
        </button>
      </div>
      <div>
        {(action?.actionType === ACTION_TYPE.EDIT ||
          action?.actionType === ACTION_TYPE.ADD) && (
          <UserModal
            action={action}
            setAction={setAction}
            stateChange={toogleStatus}
            modalTitle={
              action.actionType === ACTION_TYPE.EDIT ? "Edit User" : "Add User"
            }
          />
        )}
      </div>
      {/* Table Container (Dynamic Content) */}
      <div className="containt-table-container">
        {/* Your dynamic table component will go here */}
        <DynamicDataTable
          columns={userColumn}
          tableDataGetApi={getUsers}
          filterDefaultText={"Search By User Name / Email"}
          reRender={status}
        />
      </div>
    </div>
  );
};

export default Users;
