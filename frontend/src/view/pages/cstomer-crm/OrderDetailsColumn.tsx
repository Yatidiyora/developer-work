import moment from 'moment';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { RiEditLine } from 'react-icons/ri';
import { ACTION_TYPE, FORMAT } from '../../../common/types/enum/CommonEnum';
import { OrderDetails } from '../../../common/types/interface/Customer.interface';

const OrderDetailsColumn = ({
    setAction
}: {
    setAction: React.Dispatch<React.SetStateAction<{
    customerOrder: any;
      actionType: any;
  } | undefined>> 
}) => {
  const formatDate = (date: string): string => {
    const format = date ? moment(date).utc().format(FORMAT.NORAML_DATE) : 'N/A';
    return format;
  };

  return [
    // {
    //   name: 'Actions',
    //   cell: (row: OrderDetails) => (
    //     <DropdownButton id="dropdown-item-button" title="Action">
    //         <Dropdown.Item
    //         onClick={() => {
    //                       setAction({ customerOrder: row, actionType: ACTION_TYPE.EDIT });
    //                     }}
    //           as="button"
    //         >
    //           <i className="dropdown-icon">
    //             <RiEditLine />
    //           </i>
    //           Review
    //         </Dropdown.Item>
    //     </DropdownButton>
    //   ),
    // },
    {
      id: 'orderName',
      name: 'Order Name',
      selector: (row: OrderDetails) => row.orderName,
      wrap: true,
      sortable: true,
    },
    {
      id: 'orderCategoryType',
      name: 'order Category Type',
      selector: (row: OrderDetails) => row.orderCategoryType,
      wrap: true,
      sortable: true,
    },
    {
      id: 'orderPrice',
      name: 'Order Price',
      selector: (row: OrderDetails) => row.orderPrice,
      wrap: true,
      sortable: true,
    },
    {
      id: 'orderSerialNumber',
      name: 'Order Serial Number',
      selector: (row: OrderDetails) => row.orderSerialNumber,
      wrap: true,
      sortable: true,
    },
    {
      id: 'orderDeliveryAddress',
      name: 'Order Delivery Address',
      selector: (row: OrderDetails) => row.orderDeliveryAddress,
      wrap: true,
      sortable: true,
    },
    {
      id: 'orderDeliveryStatus',
      name: 'Order Delivery Status',
      selector: (row: OrderDetails) => row.orderDeliveryStatus,
      wrap: true,
      sortable: true,
    },
    {
      id: 'createdAt',
      name: 'Created At',
      selector: (row: OrderDetails) => formatDate(row.createdAt),
      wrap: true,
      sortable: true,
    },
    {
      id: 'updatedAt',
      name: 'Updated At',
      selector: (row: OrderDetails) => formatDate(row.updatedAt),
      wrap: true,
      sortable: true,
    },
  ];
};

export default OrderDetailsColumn;
