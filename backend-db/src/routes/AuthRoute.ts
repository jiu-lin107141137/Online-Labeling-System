import AuthController from "../controllers/AuthController";
import Route from "../Route";

class AuthRoute extends Route{
    private authController = new AuthController();

    constructor() {
      super();
      this.prefix = '/auth';
      this.setRoutes();
    }

    protected setRoutes() {
      this.router.post('/login', this.authController.login);
      this.router.post('/register', this.authController.register);
      this.router.post('/refresh', this.authController.refresh);
      this.router.post('/verify/manager', this.authController.verifyManager);
    }
}

export default AuthRoute;
