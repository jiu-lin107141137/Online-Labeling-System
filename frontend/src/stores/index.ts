import { defineStore } from "pinia"
import { ref, computed, type Ref } from "vue"

export const useInfoStore = defineStore('info', () => {
  // const refreshToken: Ref<string> = ref('');
  const accessToken: Ref<string|null> = ref(null);
  const user: Ref<any> = ref(null);

  const isLoggedIn = computed(() => user.value == null);
  const priority = computed(() => user.value?.priority ?? -1);
  
  // function setRefreshToken(token: string) {
  //   refreshToken.value = token;
  // }

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  function setUser(userInfo: any) {
    user.value = userInfo;
  }

  function clearAll() {
    accessToken.value = null;
    user.value = null;
  }

  return { /*refreshToken,*/ accessToken, user, isLoggedIn, priority, /*setRefreshToken,*/ setAccessToken, setUser, clearAll }
})