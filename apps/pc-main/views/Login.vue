<template>
  <div @click="$router.push('/layout')">跳转</div>
  <div>{{ authStore.userInfo.nickName }}</div>
  <div>{{ authStore.token }}</div>
</template>

<script lang="ts" setup>
import useHttp from '../api'
import { useAuthStore } from '../store'
const httpLogin = useHttp('login')

async function fn() {
  let ret = await httpLogin?.smsLogin(
    {
      mobile: '13122222222',
      smsCode: '123222',
    },
    (err) => {
      console.log(err)
    }
  )

  console.log(ret)
}
fn()

// httpLogin.getQrAuthUrl()

const authStore = useAuthStore()
// const { token } = storeToRefs(authStore)
// const { userInfo } = authStore

setTimeout(() => {
  authStore.userInfo.nickName = 'lisi'
  authStore.token = '1212'
}, 1000)

setTimeout(() => {
  authStore.token = 'dsfdsfsfd'
}, 1000)
</script>
