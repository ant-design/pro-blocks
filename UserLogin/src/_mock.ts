function getFakeCaptcha(req: any, res: { json: (arg0: string) => void }) {
  return res.json('captcha-xxx');
}

export default {
  'POST  /api/login/account': (
    req: { body: { password: any; userName: any; type: any } },
    res: {
      send: (data: any) => void;
    },
  ) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
