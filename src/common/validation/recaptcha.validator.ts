import { CONFIGS } from '$app/configs';
import httpStatus from 'http-status';
import fetch from 'isomorphic-fetch';

import type { Request, Response, NextFunction } from 'express';

type GOOGLE_RECAPTCHA_V3_RESPONSE = {
  success: boolean;
  challenge_ts: Date;
  hostname: string;
  action: string;
  score: number;
};

function validateRecaptchaV3(expectedAction: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const inputRecaptchaToken = req.body.token;
      const googleRecaptchaValidatorUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${CONFIGS.RECAPTCHA.V3.SECRET_KEY}&response=${inputRecaptchaToken}`;

      fetch(googleRecaptchaValidatorUrl, {
        method: 'post',
      })
        .then((response) => response.json())
        .then((googleResponse) => {
          if (
            !(googleResponse as GOOGLE_RECAPTCHA_V3_RESPONSE).success ||
            (googleResponse as GOOGLE_RECAPTCHA_V3_RESPONSE).score < 0.5 ||
            (googleResponse as GOOGLE_RECAPTCHA_V3_RESPONSE).action !=
              expectedAction
          ) {
            return res.status(httpStatus.BAD_REQUEST).send({
              status: res.statusCode,
              error: {
                code: 'BAD REQUEST',
                message: 'error in recaptcha please try again',
              },
            });
          } else {
            // remove recaptcha token field after validation
            delete req.body.token;
            next();
          }
        })
        .catch((error) => {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: res.statusCode,
            error: {
              code: 'INTERNAL SERVER ERROR',
              message: 'try again!',
              ...(CONFIGS.DEBUG ? error : {}),
            },
          });
        });
    } catch (error) {
      next(error);
    }
  };
}

export { validateRecaptchaV3 };
