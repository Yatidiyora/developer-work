import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AiTwotoneDelete } from 'react-icons/ai';
import { RiEditLine } from 'react-icons/ri';
import { PermissionIds } from '../../../api/Permissions.type';
import { usePermission } from '../../../hooks/usePermission';

const userColumns = ({
    setAction
}: {
    setAction: 
}) => {
  const formatDate = (date: Date): string => {
    const format = moment(date).utc().format('MM-DD-YYYY HH:mm:ss');
    return format;
  };
  const { rolePermissions: userPermissions } = usePermission(PermissionIds.MANAGE_USERS);

  return [
    {
      name: 'Actions',
      button: true,
      cell: (row: any) => (
        <DropdownButton id="dropdown-item-button" title="Action">
          {userPermissions.edit && (
            <Dropdown.Item
              onClick={() => {
                setShowEdit(true);
                setUserUpdateId(row.id);
              }}
              as="button"
            >
              <i className="dropdown-icon">
                <RiEditLine />
              </i>
              Edit
            </Dropdown.Item>
          )}

          {userPermissions.delete && (
            <Dropdown.Item
              onClick={() => {
                setShowDelete(true);
                setUserDeleteId(row.id);
                setUserName(row.userName);
              }}
              as="button"
            >
              <i className="dropdown-icon">
                <AiTwotoneDelete />
              </i>
              Delete
            </Dropdown.Item>
          )}
        </DropdownButton>
      ),
    },
    {
      id: 'userName',
      name: 'IDM Username',
      selector: (row: any) => row.userName,
      wrap: true,
      sortable: true,
    },
    {
      id: 'firstName',
      name: 'First Name',
      selector: (row: any) => row.firstName,
      wrap: true,
      sortable: true,
    },
    {
      id: 'lastName',
      name: 'Last Name',
      selector: (row: any) => row.lastName,
      wrap: true,
      sortable: true,
    },
    {
      id: 'email',
      name: 'Primary Email Address',
      selector: (row: any) => row.email,
      wrap: true,
      sortable: true,
      minWidth: '240px',
    },
    {
      id: 'createdAt',
      name: 'Created At',
      selector: (row: any) => formatDate(row.createdAt),
      wrap: true,
      sortable: true,
    },
    {
      id: 'updatedAt',
      name: 'Updated At',
      selector: (row: any) => formatDate(row.updatedAt),
      wrap: true,
      sortable: true,
    },
  ];
};

export default userColumns;
