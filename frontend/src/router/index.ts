import { createRouter, createWebHistory } from 'vue-router'
import { useInfoStore } from '@/stores'
import routes from './routes';
import UserAPI from '@/assets/js/UserAPI';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from) => {
  const infoStore = useInfoStore();
  if(to.meta?.requireLoggedIn) {
    const token = JSON.parse(window.sessionStorage.getItem('accessToken') ?? '"')?.content;
    if(!token) {
      alert('Please login first');
      return { name: 'login' };
    }
    infoStore.setAccessToken(token);
    infoStore.setUser(JSON.parse(window.sessionStorage.getItem('user') ?? '{}')?.content);
    if(to.meta?.requireManager && infoStore.accessToken) {
      let rt = await UserAPI.verifyManager(infoStore.accessToken);
      if(!rt?.data) {
        alert('Unauthorized!')
        return { name: 'home' };
      }
    }
  }
  else if(to.name == 'login') {
    const token = JSON.parse(window.sessionStorage.getItem('refreshToken') ?? '""')?.content;
    if(token) {
      // login by token here
      let res = await UserAPI.loginByToken(token);
      if(res?.code == 200 && res.data?.user && res.data?.refreshToken && res.data?.accessToken) {
        window.sessionStorage.setItem('user', JSON.stringify({ content: res.data.user }));
        window.sessionStorage.setItem('accessToken', JSON.stringify({ content: res.data.accessToken }));
        window.sessionStorage.setItem('refreshToken', JSON.stringify({ content: res.data.refreshToken }));
        infoStore.setAccessToken(res.data.accessToken);
        infoStore.setUser(res.data.user);
        return { name: 'home' };
      }
    }
  }
})

export default router;
