import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
