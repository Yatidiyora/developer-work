import { RiDashboardLine } from "react-icons/ri";
import { SidebarConfig } from "../interface/Layouts.interface";
import CustomerCRM from "../../../view/pages/cstomer-crm/CustomerCRM";
import React from "react";

// Sidebar and Route Configuration
export const sidebarConfig: SidebarConfig[] = [
  {
    label: "Customer CRM",
    path: "/customer-crm",
    component: () => <CustomerCRM />,
    icon: () => <RiDashboardLine size={24}/>,
  },
  // {
  //   label: "Client Activities",
  //   icon: () => <TbFileDots size={24}/>,
  //   children: [
  //     {
  //       label: "Client Activities1",
  //       path: "/client-activities2",
  //       icon: () => <FaMoneyBills size={24}/>,
  //       component: () => <FinanceDetails />,
  //     },
  //     {
  //       label: "Client Activities1",
  //       path: "/client-activities1",
  //       icon: () => <FaMoneyBills size={24}/>,
  //       component: () => <FinanceDetails />,
  //     },
  //   ],
  // },
];
