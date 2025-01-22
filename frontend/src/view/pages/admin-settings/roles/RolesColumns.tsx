import moment from 'moment';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AiTwotoneDelete } from 'react-icons/ai';
import { RiEditLine } from 'react-icons/ri';
import { ACTION_TYPE, FORMAT } from '../../../../common/types/enum/CommonEnum';
import { Role, RoleActionState } from '../../../../common/types/interface/RoleModal.interface';

const RolesColumns = ({
    setAction
}: {
    setAction: React.Dispatch<React.SetStateAction<RoleActionState | undefined>> 
}) => {
  const formatDate = (date?: string): string => {
    const format = date ? moment(date).utc().format(FORMAT.NORAML_DATE) : 'N/A';
    return format;
  };

  return [
    {
      name: 'Actions',
      cell: (row: Role) => (
        <DropdownButton id="dropdown-item-button" title="Action">
            <Dropdown.Item
            onClick={() => {
              setAction({role: row, actionType: ACTION_TYPE.EDIT, roleDelete: false, roleDeleteId: ""})
            }}
              as="button"
            >
              <i className="dropdown-icon">
                <RiEditLine />
              </i>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
            onClick={() => {
              setAction({role: row, actionType: ACTION_TYPE.DELETE, roleDelete: true, roleDeleteId: row.id})
            }}
              as="button"
            >
              <i className="dropdown-icon">
                <AiTwotoneDelete />
              </i>
              Delete
            </Dropdown.Item>
        </DropdownButton>
      ),
    },
    {
      id: 'name',
      name: 'Name',
      selector: (row: Role) => row.name,
      wrap: true,
      sortable: true,
    },
    {
      id: 'description',
      name: 'Description',
      selector: (row: Role) => row.description,
      wrap: true,
      sortable: true,
    },
    {
      id: 'createdAt',
      name: 'Created At',
      selector: (row: Role) => formatDate(row.createdAt),
      wrap: true,
      sortable: true,
    },
    {
      id: 'updatedAt',
      name: 'Updated At',
      selector: (row: Role) => formatDate(row.updatedAt),
      wrap: true,
      sortable: true,
    },
  ];
};

export default RolesColumns