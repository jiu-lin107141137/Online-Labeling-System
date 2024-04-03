import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireLoggedIn: false,
      requireManager: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requireLoggedIn: false,
      requireManager: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: LoginView,
    meta: {
      requireLoggedIn: false,
      requireManager: false,
    }
  },
];

export default routes;