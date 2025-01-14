import moment from 'moment';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AiTwotoneDelete } from 'react-icons/ai';
import { RiEditLine } from 'react-icons/ri';
import { ACTION_TYPE, FORMAT } from '../../../../common/types/enum/CommonEnum';

const RolesColumns = ({
    setAction
}: {
    setAction: React.Dispatch<React.SetStateAction<{
      user: any;
      actionType: any;
  } | undefined>> 
}) => {
  const formatDate = (date: Date): string => {
    const format = date ? moment(date).utc().format(FORMAT.NORAML_DATE) : 'N/A';
    return format;
  };

  return [
    {
      name: 'Actions',
      cell: (row: any) => (
        <DropdownButton id="dropdown-item-button" title="Action">
            <Dropdown.Item
            onClick={() => {
              setAction({user: row, actionType: ACTION_TYPE.EDIT})
            }}
              as="button"
            >
              <i className="dropdown-icon">
                <RiEditLine />
              </i>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
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
      selector: (row: any) => row.name,
      wrap: true,
      sortable: true,
    },
    {
      id: 'description',
      name: 'Description',
      selector: (row: any) => row.description,
      wrap: true,
      sortable: true,
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

export default RolesColumns