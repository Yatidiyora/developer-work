import React from 'react'

const Users = () => {
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
        <p>Loading user records...</p>
      </div>
    </div>
  );
}

export default Users;
