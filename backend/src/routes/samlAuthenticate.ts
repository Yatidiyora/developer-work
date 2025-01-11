import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import getConfig from '../common/config/config';
import { LogoutTokenPayload, Profile, RequestWithUser } from '../common/types/interfaces/SamlAuth';
import { samlCallback, samlStrategy } from '../samlStrategy';
import { STATUS_CODE, STATUS_MESSAGE } from '../common/types/enums/CommonEnums';
import { UserDetailsModel } from '../common/models/pg/UserDetailsModel';
import { getCustomLogger } from '../common/utils/Logger';

const logger = getCustomLogger('samlAuth::routes');

const router = express.Router();

router.get('/login', passport.authenticate('saml', { failureRedirect: '/login/fail' }), (req, res) => {
  res.redirect('/');
});

router.post('/login/callback', passport.authenticate('saml', { failureRedirect: '/login/fail' }), samlCallback);

router.post('/', passport.authenticate('saml', { failureRedirect: '/login/fail' }), samlCallback);

router.get('/login/fail', (req, res) => {
  res.status(401).send('Login failed');
});

router.get('/logout', (req: Request<any, any, any, { token: string }>, res: Response) => {
  // Get token
  const token = req.query.token;
  if (!token) {
    return res.redirect('/api/login');
  }
  const { SECRET_KEY } = getConfig();

  const decoded = jwt.verify(token, SECRET_KEY) as LogoutTokenPayload;
  UserDetailsModel.findByPk(decoded.id).then((user) => {
    req.user = {
      nameID: user.email,
      nameIDFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    } as Profile;
    samlStrategy.logout(req as unknown as RequestWithUser, (error, request) => {
      if (!error) {
        res.redirect(request);
      }
    });
  });
});

router.get('/banyan-logout', (req: Request, res: Response) => {
  // Get token
  const { SECRET_KEY } = getConfig();
  const { token } = req.headers as { token: string };
  const decoded = jwt.verify(token, SECRET_KEY) as LogoutTokenPayload;
  UserDetailsModel.findByPk(decoded.id).then((user) => {
    req.user = {
      nameID: user.email,
      nameIDFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    } as Profile;
    samlStrategy.logout(req as unknown as RequestWithUser, (error, request) => {
      if (!error) {
        res.status(STATUS_CODE.SUCCESS).json({ message: 'Success', status: STATUS_MESSAGE.SUCCESS });
      }
    });
  });
});

router.get('/logout/callback', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
  res.redirect('/api/login');
});

export default router;
