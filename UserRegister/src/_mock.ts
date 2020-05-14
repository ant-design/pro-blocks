// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export default {
  'POST  /api/register': (_: Request, res: Response) => {
    res.send({
      data: { status: 'ok', currentAuthority: 'user' },
    });
  },
};
