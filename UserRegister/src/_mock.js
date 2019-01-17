export default {
  'POST /api/BLOCK_NAME/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
};
