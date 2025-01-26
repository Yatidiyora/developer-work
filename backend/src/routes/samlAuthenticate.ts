import express, { Request, Response } from 'express';
import passport from 'passport';
import getConfig from '../common/config/config';
import { LogoutTokenPayload, Profile, RequestWithUser } from '../common/types/interfaces/SamlAuth';
import { samlCallback, samlStrategy } from '../samlStrategy';
import { STATUS_CODE, STATUS_MESSAGE } from '../common/types/enums/CommonEnums';
import { UserDetailsModel } from '../common/models/pg/UserDetailsModel';
import { getCustomLogger } from '../common/utils/Logger';

const logger = getCustomLogger('samlAuth::routes');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  samlCallback
);

router.post('/', passport.authenticate('saml', { failureRedirect: '/login/fail' }), samlCallback);

router.get('/login/fail', (req, res) => {
  res.status(401).send('Login failed');
});


export default router;
