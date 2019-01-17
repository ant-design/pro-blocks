function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'POST /api/BLOCK_NAME/account': (req, res) => {
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
  'GET /api/BLOCK_NAME/captcha': getFakeCaptcha,
};
