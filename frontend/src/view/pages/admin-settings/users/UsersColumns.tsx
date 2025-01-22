import moment from "moment";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { ACTION_TYPE, FORMAT } from "../../../../common/types/enum/CommonEnum";
import { User } from "../../../../common/types/interface/UserModal.interface";

const userColumns = ({
  setAction,
}: {
  setAction: React.Dispatch<
    React.SetStateAction<
      | {
          user: User;
          actionType: ACTION_TYPE;
          userDelete: boolean;
          userDeleteId: string;
        }
      | undefined
    >
  >;
}) => {
  const formatDate = (date: Date): string => {
    const format = date ? moment(date).utc().format(FORMAT.NORAML_DATE) : "N/A";
    return format;
  };

  return [
    {
      name: "Actions",
      cell: (row: any) => (
        <DropdownButton id="dropdown-item-button" title="Action">
          <Dropdown.Item
            onClick={() => {
              setAction({ user: row, actionType: ACTION_TYPE.EDIT, userDelete: false, userDeleteId: "" });
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
              setAction({ user: row, actionType: ACTION_TYPE.DELETE, userDelete: true, userDeleteId: row.id });
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
      id: "userName",
      name: "Username",
      selector: (row: any) => row.userName,
      wrap: true,
      sortable: true,
    },
    {
      id: "firstName",
      name: "First Name",
      selector: (row: any) => row.firstName,
      wrap: true,
      sortable: true,
    },
    {
      id: "lastName",
      name: "Last Name",
      selector: (row: any) => row.lastName,
      wrap: true,
      sortable: true,
    },
    {
      id: "email",
      name: "Email Address",
      selector: (row: any) => row.email,
      wrap: true,
      sortable: true,
    },
    {
      id: "createdAt",
      name: "Created At",
      selector: (row: any) => formatDate(row.createdAt),
      wrap: true,
      sortable: true,
    },
    {
      id: "updatedAt",
      name: "Updated At",
      selector: (row: any) => formatDate(row.updatedAt),
      wrap: true,
      sortable: true,
    },
  ];
};

export default userColumns;
