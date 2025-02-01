import React, { useMemo, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ManageUserApi from "../../../../api/ManageUserApi";
import { initialUser } from "../../../../common/types/constants/CommonConstants";
import { ACTION_TYPE } from "../../../../common/types/enum/CommonEnum";
import {
  UserActionState,
} from "../../../../common/types/interface/UserModal.interface";
import { useToggle } from "../../../../hooks/useToogle";
import DeleteModal from "../../../common/modals/DeleteModal";
import UserModal from "../../../common/modals/UserModal";
import { DynamicDataTable } from "../../../data-table/DynamicDataTable";
import userColumns from "./UsersColumns";

const Users = () => {
  const [action, setAction] = useState<UserActionState>();
  const userColumn = userColumns({ setAction });
  const { status, toggleStatus } = useToggle();

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

  const deleteUser = async (id: string) => {
    return await trackPromise(
      userInstance.deleteUserById(id)
    );
  }

  const DeleteModalSource = useMemo(() => {
    return <div>
      <p>Are you sure you want to delete this user!</p>
    </div>;
  }, [action?.user]);

  const addUserModel = () => {
    setAction({
      user: initialUser,
      actionType: ACTION_TYPE.ADD,
      userDelete: false,
      userDeleteId: "",
    });
  };
  return (
    <div className="containt-management">
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
            stateChange={toggleStatus}
            modalTitle={
              action.actionType === ACTION_TYPE.EDIT ? "Edit User" : "Add User"
            }
          />
        )}
        {action?.actionType === ACTION_TYPE.DELETE && (
          <DeleteModal
            action={action}
            setAction={setAction}
            stateChange={toggleStatus}
            actionTitle={"userDelete"}
            modalHeading={"Delete User"}
            modalSubHeading={action.user.userName}
            renderFieldComponent={DeleteModalSource}
            actionFun={deleteUser}
          />
        )}
      </div>
      <div className="containt-table-container">
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
