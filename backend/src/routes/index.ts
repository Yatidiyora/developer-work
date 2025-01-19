import { Router } from 'express';
import { jwtStrategy } from '../auth/middleWare/auth';
import jwtRoute from './jwtRoutes';
import roleRoute from './roleRoutes';
import samlRoutes from './samlAuthenticate';
import userRoute from './userRoutes';
import customerRoute from './customerRoutes';
import rolePermissionRoutes from './rolePermissionRoutes';

const route = Router();

route.use('/role', jwtStrategy().authenticate(), roleRoute);
route.use('/user', jwtStrategy().authenticate(), userRoute);
route.use('/permissions', jwtStrategy().authenticate(), rolePermissionRoutes);
route.use('/customer', jwtStrategy().authenticate(), customerRoute);
route.use('/token', jwtRoute);

route.use('/', samlRoutes);

export default route;
