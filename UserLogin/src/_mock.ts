import { Request, Response } from 'express';

const requestTimeout = 2000; // 网络请求延迟 2s，便于观察按钮的 loading 状态

export default {
  'POST  /api/login/account': (req: Request, res: Response) => {
    setTimeout(() => {
      const { password, userName, type } = req.body;
      if (password === 'ant.design' && userName === 'admin') {
        res.send({ status: 'ok', type, currentAuthority: 'admin' });
        return;
      }
      if (password === 'ant.design' && userName === 'user') {
        res.send({ status: 'ok', type, currentAuthority: 'user' });
        return;
      }
      res.send({ status: 'error', type, currentAuthority: 'guest' });
    }, requestTimeout);
  },

  'POST  /api/login/mobile': (req: Request, res: Response) => {
    setTimeout(() => {
      const { mobile, captcha, type } = req.body;
      if (mobile === '10123456789' && captcha === '111111') {
        res.send({ status: 'ok', type, currentAuthority: 'admin' });
        return;
      }
      res.send({ status: 'error', type, currentAuthority: 'guest' });
    }, requestTimeout);
  },

  'GET  /api/login/captcha': (req: Request, res: Response) => {
    setTimeout(() => res.json('captcha-xxx'), requestTimeout);
  },
};
