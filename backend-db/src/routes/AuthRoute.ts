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
    }
}

export default AuthRoute;
