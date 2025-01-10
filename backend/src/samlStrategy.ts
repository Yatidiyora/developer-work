import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import moment from 'moment';
import { MultiSamlStrategy } from 'passport-saml';
import { SamlOptionsCallback } from 'passport-saml/lib/passport-saml/types';
import querystring from 'querystring';
import url from 'url';
import getConfig from './common/config/config';
import logger from './common/utils/Logger';
import { UserDetailsModel } from './common/models/UserDetailsModel';



export const samlStrategy = new MultiSamlStrategy(
  {
    getSamlOptions: function (request: Request<any, any, any, { RelayState: string }>, done: SamlOptionsCallback) {
      const {
        SAML: { CALLBACK_URL, ENTRY_POINT, ISSUER, IDP_LOGOUT_URL, SP_LOGOUT_CALLBACK, IPD_CERT },
        FRONTEND: { AUTH_REDIRECT_URL },
      } = getConfig();
      done(null, {
        // URL that goes from the Identity Provider -> Service Provider
        callbackUrl: CALLBACK_URL,
        // URL that goes from the Service Provider -> Identity Provider
        entryPoint: ENTRY_POINT,
        // Usually specified as `/shibboleth` from site root
        issuer: ISSUER,
        identifierFormat: null,
        // Service Provider private key
        decryptionPvk: fs.readFileSync(__dirname + '/../cert/key.pem', 'utf8'),
        // Identity Provider's public key
        cert: IPD_CERT ?? '',
        validateInResponseTo: false,
        signatureAlgorithm: 'sha512',
        disableRequestedAuthnContext: true,
        logoutUrl: IDP_LOGOUT_URL,
        // logoutCallbackUrl: SP_LOGOUT_CALLBACK,
        additionalParams: {
          TargetResource: request.query.RelayState || (AUTH_REDIRECT_URL ?? ''),
        },
      });
    },
  },
  (profile: any, done: any) => {
    logger.debug('User profile info', profile);
    return done(null, {
      id: profile.id,
      email: profile.email,
      firstName: profile.firstname,
      lastName: profile.lastname,
      sessionIndex: profile.sessionIndex,
      saml: {
        nameID: profile.nameID,
        nameIDFormat: profile.nameIDFormat,
        token: profile.getAssertionXml(),
      },
    });
  },
);

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  else return res.redirect('/api/login');
};

export const samlCallback = async (
  req: Request & {
    user: {
      email: string;
      firstName: string;
      lastName: string;
      saml: {
        nameID: string;
      };
    };
  },
  res: Response,
) => {
  // Generate user and jwt token
  try {
    const {
      TOKEN_MAX_AGE_VALUE_IN_HOURS,
      FRONTEND: { AUTH_REDIRECT_URL },
      SECRET_KEY,
      TOKEN_EXPIRATION,
    } = getConfig();

    const {
      email,
      saml: { nameID },
    } = req.user;
    const user = await UserDetailsModel.findOne({
      where: {
        userName: nameID,
      },
    });
    const tokenMaxAge = new Date().getTime() + (TOKEN_MAX_AGE_VALUE_IN_HOURS as unknown as number) * 60 * 60 * 1000;
    const tokenNewMaxAgeDate = moment(tokenMaxAge).utc().toDate();
    if (!user) {
      logger.debug('User details not found  so redirect to fail page');
      res.redirect('/login/fail');
    } else {
      await UserDetailsModel.update(
        { tokenMaxAge: tokenNewMaxAgeDate },
        {
          where: {
            userName: nameID,
          },
        },
      );
    }

    const token = jwt.sign({ id: user?.id, userName: user?.userName, email: user?.email }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    const payload = {
      token,
      email: email,
      registered: true,
    };

    const relayState = req.body.RelayState || AUTH_REDIRECT_URL;
    const parsedUrl = new URL(relayState);
    const domain = `.${parsedUrl.hostname.split('.').slice(1).join('.')}`;
    const hashedHostname = md5(parsedUrl.hostname);

    res.cookie(`${hashedHostname}_token`, token, {
      maxAge: 3600 * 1000 * Number(TOKEN_MAX_AGE_VALUE_IN_HOURS),
      domain,
    });
    if (/localhost/.test(relayState)) {
      res.setHeader('Cache-Control', 'no-cache, no store');
      res.redirect((relayState) + '?' + querystring.stringify(payload));
    } else {
      res.setHeader('Cache-Control', 'no-cache, no store');
      res.redirect(relayState);
    }
  } catch (error) {
    logger.error('Error while executing saml callback', error.message || error.stack || error);
    res.redirect('/login/fail');
  }
};
