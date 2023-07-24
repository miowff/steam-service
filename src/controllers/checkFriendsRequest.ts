import { NextFunction, Request, Response } from "express";
import { steamService } from "../services/steamService";
class CheckFriendsRequest {
  async checkFriendsRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { steamId } = req.body;
      const userFriends = await steamService.checkFriendRequest(steamId);
      return res.status(200).json(userFriends);
    } catch (err) {
      next(err);
    }
  }
}

export const checkFriendsRequest = new CheckFriendsRequest();
