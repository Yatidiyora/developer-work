import React from 'react';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { RolePermissions, TogglerType } from '../../../../common/types/interface/RoleModal.interface';
import { TOGGER_PERMISSION_TYPE } from '../../../../common/types/enum/CommonEnum';

const RolePermissionToggleColumns = ({setToggler}: {setToggler: React.Dispatch<React.SetStateAction<TogglerType>>}) => {
  const toggleButton = (id: string, type: TOGGER_PERMISSION_TYPE, value: boolean) => {
      if (id) {
        setToggler((prevState) => ({
          ...prevState,
          assignedPermissions: {
            ...prevState.assignedPermissions,
            [id]: {
              // Preserve existing properties for the roleName, default to false if the role doesn't exist
              name: prevState.assignedPermissions[id]?.name,
              view: type === TOGGER_PERMISSION_TYPE.VIEW ? value : (prevState.assignedPermissions[id]?.view || false),
              edit: type === TOGGER_PERMISSION_TYPE.EDIT ? value : (prevState.assignedPermissions[id]?.edit || false),
              delete: type === TOGGER_PERMISSION_TYPE.DELETE ? value : (prevState.assignedPermissions[id]?.delete || false),
            },
          },
        }));
      }
    };
    return [
        {
          name: 'Name',
          selector: (row: any) => row.name,
          wrap: true,
          sortable: true,
        },
        {
          name: 'View',
          cell: (row: any) =>
            row.view ? (
              <i
                className="toggle-icon"
                onClick={() => {
                  const roleId = row.id;
                  if (roleId) {
                    toggleButton(roleId, TOGGER_PERMISSION_TYPE.VIEW, false);
                  }
                }}
              >
                <BsToggleOn />
              </i>
            ) : (
              <i
                className="toggle-icon"
                onClick={() => {
                  const roleId = row.id;
                  if (roleId) {
                    toggleButton(roleId, TOGGER_PERMISSION_TYPE.VIEW, true);
                  }
                }}
              >
                <BsToggleOff />
              </i>
            ),
          wrap: true,
          sortable: false,
          width: "60px"
        },
        {
          name: 'Edit',
          cell: (row: any) =>
            row.edit ? (
              <i
                className="toggle-icon"
                onClick={() => {
                  const roleId = row.id;
                  if (roleId) {
                    toggleButton(roleId, TOGGER_PERMISSION_TYPE.EDIT, false);
                  }
                }}
              >
                <BsToggleOn />
              </i>
            ) : (
              <i
                className="toggle-icon"
                onClick={() => {
                  const roleId = row.id;
                  if (roleId) {
                    toggleButton(roleId, TOGGER_PERMISSION_TYPE.EDIT, true);
                  }
                }}
              >
                <BsToggleOff />
              </i>
            ),
          wrap: true,
          sortable: false,
          width: "60px"
        },
        {
          name: 'Delete',
          cell: (row: any) =>
            row.delete ? (
              <i
                className="toggle-icon"
                onClick={() => {
                  const roleId = row.id;
                  if (roleId) {
                    toggleButton(roleId, TOGGER_PERMISSION_TYPE.DELETE, false);
                  }
                }}
              >
                <BsToggleOn />
              </i>
            ) : (
              <i
                className="toggle-icon"
                onClick={() => {
                  const roleId = row.id;
                  if (roleId) {
                    toggleButton(roleId, TOGGER_PERMISSION_TYPE.DELETE, true);
                  }
                }}
              >
                <BsToggleOff />
              </i>
            ),
          wrap: true,
          sortable: false,
          minWidth: "60px"
        },
      ]
};

  export default RolePermissionToggleColumns;