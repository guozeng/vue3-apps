<template>
  <div @click="getA">登录11111</div>
</template>

<script setup>
import { httpGet } from '/@/'

function getA() {
  httpGet('/test/api/crm/wechat/getQrAuthUrl').then((res) => {
    console.log(res)
  })
}

getA()
</script>
