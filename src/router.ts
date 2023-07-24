import Router from "express";
import { checkFriendsRequest } from "./controllers/checkFriendsRequest";
import { userStatsController } from "./controllers/userStatsController";
import { wakeUpRender } from "./controllers/wakeUpRender";

const defaultRouter = Router();

defaultRouter.post(
  "/checkFriendsRequest",
  checkFriendsRequest.checkFriendsRequest
);
defaultRouter.post("/matchStats", userStatsController.getMatchStats);
defaultRouter.get("/wake-up-Render", wakeUpRender.wakeUp);
export default defaultRouter;
