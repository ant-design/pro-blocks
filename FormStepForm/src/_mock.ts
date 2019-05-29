export default {
  'POST  /api/forms': (req: any, res: { send: (arg0: { message: string }) => void }) => {
    res.send({ message: 'Ok' });
  },
};
