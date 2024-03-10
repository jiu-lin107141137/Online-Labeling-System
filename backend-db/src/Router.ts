import Route from "./Route";
import AuthRoute from "./routes/AuthRoute";

export const router: Array<Route> = [
  new AuthRoute(),
];
