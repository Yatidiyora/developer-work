import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerCRMApi from '../../../api/CustomerCRMApi';

const CustomerCRM = () => {
    const [customers, setCustomers] = useState<any>([]);
    const customerCrmInstance = CustomerCRMApi.getCustomerCRMInstance();

    useEffect(() => {
        const getAllCustomersRecords = async () => {
            const customersRecords = await customerCrmInstance.getCRMCustomers();
            setCustomers(customersRecords);
        }
        getAllCustomersRecords();
    }, []);

    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer._id}>
                        {customer.name} - {customer.email}
                        <ul>
                            {customer.orders.map((order, index) => (
                                <li key={index}>Order on {order.date}: ${order.amount}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerCRM