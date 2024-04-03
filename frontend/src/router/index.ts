import { createRouter, createWebHistory } from 'vue-router'
import { useInfoStore } from '@/stores'
import routes from './routes';
import UserAPI from '@/assets/js/UserAPI';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

router.beforeEach(async (to, from) => {
  const infoStore = useInfoStore();
  if(to.meta?.requireLoggedIn) {
    const token = JSON.parse(window.sessionStorage.getItem('accessToken') ?? '')?.content;
    if(!token) {
      alert('Please login first');
      return { name: 'login' };
    }
    infoStore.setAccessToken(token);
    infoStore.setUser(JSON.parse(window.sessionStorage.getItem('user') ?? '{}')?.content);
    if(to.meta?.requireManager) {
      let rt = await UserAPI.verifyManager(infoStore.accessToken);
      if(!rt?.data)
        return { name: 'home' };
    }
  }
})

export default router;
