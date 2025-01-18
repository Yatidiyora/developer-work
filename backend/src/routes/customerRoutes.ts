import express from 'express';
import * as CustomerService from '../lib/customers/service/CustomerService';
import { validatePermission } from '../auth/middleWare/validatePermission';
import { MODULE, ACTION } from '../common/types/enums/CommonEnums';

const router = express.Router();

router.get('/', validatePermission(MODULE.CUSTOMER, ACTION.VIEW), CustomerService.fetchAllCustomers);

export default router;