import { Router } from "express";

abstract class Route {
    protected prefix: string = '/';
    protected router = Router();
    protected abstract setRoutes(): void;

    public getPrefix() {
      return this.prefix;
    }

    public getRouter() {
        return this.router;
    }
}

export default Route;
