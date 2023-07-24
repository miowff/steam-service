import { NextFunction, Request, Response } from "express";

class WakeUpRender {
  async wakeUp(req: Request, res: Response, next: NextFunction) {
    try {
      res.json("Woke up");
    } catch (err) {
      next(err);
    }
  }
}

export const wakeUpRender = new WakeUpRender();
