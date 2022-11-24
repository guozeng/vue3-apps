<template>
  <div @click="getA">登录11111</div>
</template>

<script setup>
import useHttp from '../api'
const httpLogin = useHttp('login')

async function fn() {
  let ret = await httpLogin.smsLogin({
    mobile: '1312222222112',
    smsCode: '123222',
  })

  console.log(ret)
}
fn()

// httpLogin.getQrAuthUrl()
</script>
