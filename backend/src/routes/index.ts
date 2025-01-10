import { Router } from 'express';
import { jwtStrategy } from '../auth/middleWare/auth';
import jwtRoute from './jwtRoutes';
import roleRoute from './roleRoutes';
import samlRoutes from './samlAuthenticate';
import userRoute from './userRoutes';

const route = Router();

route.use('/role', jwtStrategy().authenticate(), roleRoute);
route.use('/user', jwtStrategy().authenticate(), userRoute);
route.use('/token', jwtRoute);

route.use('/', samlRoutes);

export default route;
