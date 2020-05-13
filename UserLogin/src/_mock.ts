// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json({
    data: 'captcha-xxx',
  });
}

export default {
  'POST  /api/login/account': (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        data: {
          status: 'ok',
          type,
          currentAuthority: 'admin',
        },
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        data: {
          status: 'ok',
          type,
          currentAuthority: 'user',
        },
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    res.send({
      data: {
        status: 'error',
        type,
        currentAuthority: 'guest',
      },
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
