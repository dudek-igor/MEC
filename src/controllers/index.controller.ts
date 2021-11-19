import { Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response) => {
    res.status(200).json({ success: true, error: false, data: 'Hello from MEC' });
  };
}

export default IndexController;
