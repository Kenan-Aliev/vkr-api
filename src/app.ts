import express, { Express } from "express";
import {
  superadminRouter,
  managersRouter,
  authRouter,
  branchesRouter,
  subjectsRouter,
  tariffsRouter,
  adSourcesRouter,
} from "./routes";
import { exceptionMiddleware } from "./middlewares";

class App {
  app: Express;
  port: string | undefined;
  constructor(app: Express) {
    this.app = app;
    this.port = process.env.PORT;
  }

  init() {
    this.app.use(express.json());
    this.app.use("/superadmin", superadminRouter);
    this.app.use("/manager", managersRouter);
    this.app.use("/branch", branchesRouter);
    this.app.use("/auth", authRouter);
    this.app.use("/subject", subjectsRouter);
    this.app.use("/tariff", tariffsRouter);
    this.app.use("/adSource", adSourcesRouter);
    this.app.use(exceptionMiddleware);
    this.app.listen(this.port, () => {
      console.log(`Server started on PORT ${this.port}`);
    });
  }
}

export default App;
