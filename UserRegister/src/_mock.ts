export default {
  'POST  /api/register': (
    req: any,
    res: { send: (arg0: { status: string; currentAuthority: string }) => void },
  ) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
};
