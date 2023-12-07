import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/Home.vue")
  },
  {
    path: '/vue3VideoPlayer',
    name: 'vue3VideoPlayer',
    component: () => import("../views/Vue3VideoPlayer.vue"),
    meta: {
      title: 'vue3VideoPlayer示例'
    }
  },
  {
    path: '/h265Web',
    name: 'h265Web',
    component: () => import('../views/H265Web.vue'),
    meta: {
      title: 'H265Web示例'
    }
  },
  {
    path: '/aliyun',
    name: 'aliyun',
    component: () => import('../views/AliYun.vue'),
    meta: {
      title: '阿里云播放器'
    }
  },
  {
    path: '/fullScreen',
    name: 'fullScreen',
    component: () => import('../views/FullScreen.vue'),
    meta: {
      title: '全屏'
    }
  },
  {
    path: '/camera',
    name: 'camera',
    component: () => import('../views/Camera.vue'),
    meta: {
      title: '照相'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) =>{
  document.title = to.meta.title as string;
})
export default router
