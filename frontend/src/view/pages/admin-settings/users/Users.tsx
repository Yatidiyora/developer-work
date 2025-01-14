import React, { useEffect, useState } from 'react'
import { DynamicDataTable } from '../../../data-table/DynamicDataTable';
import userColumns from './UsersColumns';
import ManageUserApi from '../../../../api/ManageUserApi';
import { trackPromise } from 'react-promise-tracker';
import { useToogle } from '../../../../hooks/useToogle';

const Users = () => {
  const [action, setAction] = useState<{
    user: any;
    actionType: any;
  }>();
  const userColumn = userColumns({setAction});
  const { status, toogleStatus } = useToogle();

  const userInstance = ManageUserApi.getManageUserInstance();

  const getUsers = async (keyword: string | null, size: number, offset: number, colName: string, sort: string) => {
    return await trackPromise(userInstance.getUsers(size, offset, keyword, colName, sort))
  }
  return (
    <div className="user-management">
      {/* Page Header */}
      <div className="user-management-header">
        <h2>Users Management</h2>
        <button className="add-user-btn">+ Add New</button>
      </div>

      {/* Table Container (Dynamic Content) */}
      <div className="user-table-container">
        {/* Your dynamic table component will go here */}
        <DynamicDataTable
          columns={userColumn}
          tableDataGetApi={getUsers}
          filterDefaultText={'Search By User Name / Email'}
          reRender={status}
        />
      </div>
    </div>
  );
}

export default Users;
