import express, { Express } from "express";
import bodyParser from "body-parser";
import defaultRouter from "./router";
import { handleError } from "./middleware/errorsMiddleware";
import { steamService } from "./services/steamService";

const app: Express = express();

app.use(bodyParser.json());
app.use("/", defaultRouter);
app.use(handleError);

app.listen(3000, async () => {
  console.log(`Server started on port 3000`);
  await steamService.logIn();
  await steamService.setGameCsGo();
  steamService.thisUser();
});