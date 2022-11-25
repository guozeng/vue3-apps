import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: '12',
      userInfo: {
        nickName: 'guozeng',
      },
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
})

export default useAuthStore
