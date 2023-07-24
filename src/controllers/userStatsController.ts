import { NextFunction, Request, Response } from "express";

import { steamService } from "../services/steamService";

class UserStats {
  async getMatchStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { steamId, matchCode } = req.body;
      const kills = await steamService.getPlayerStatKills(steamId, matchCode);
      res.json(kills);
    } catch (err) {
      next(err);
    }
  }
}

export const userStatsController = new UserStats();
