<template>
  <ul>
    <li
      v-for="item in routeList"
      :key="item.path"
    >
      <router-link :to="item.path">{{ item.label }}</router-link>
      <p></p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  interface RouteList {
    path: string;
    label: string;
    [key: string]: any;
  }

  const routeList: Array<RouteList> = [
    {
      label: 'h265编码转换h264',
      path: '/h265Web'
    },
    {
      label: 'vue3VideoPlayer',
      path: '/vue3VideoPlayer'
    },
    {
      label: 'aliyun播放器',
      path: '/aliyun'
    },
    {
      label: '去考试',
      path: '/fullScreen'
    },
    {
      label: '照相',
      path: '/camera'
    }
  ]
</script>
