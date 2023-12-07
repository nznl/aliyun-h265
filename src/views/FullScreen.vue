<template>
  <div id="screen-laytout"></div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';

const $router = useRouter();
const $route = useRoute();

// 进入考试页面全屏
ElMessageBox.confirm(
  "请全屏?",
  'tip',
  {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }
).then(() => {
  enterFullscreen();
  // 请求页面数据接口
}).catch(() => {
  $router.push('/');
})

// 阻止鼠标刷新行为
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(event) {
  // 阻止刷新页面的默认行为
  if (event.key === 'F5' || (event.key === 'r' && (event.ctrlKey || event.metaKey))) {
    event.preventDefault();
  }
})

window.addEventListener('blur', () => {
  ElMessage.warning("请勿离开页面，否则五秒后自动交卷！");
});

document.addEventListener("fullscreenchange", (event) => {
  if (document.fullscreenElement) {

  } else {
    ElMessageBox.confirm(
      "请进入全屏，否则将自动交卷",
      'tip',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    ).then(() => {
      enterFullscreen();
      // 请求页面数据接口
    }).catch(() => {
      $router.push('/');
    })
  }
});
// 程序切换是系统级别，无法控制
function enterFullscreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

onMounted(() => {

});


// 退出全屏模式
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}


// 启用禁止切屏功能
</script>

<style lang="less" scoped>
#screen-laytout {
  width: 100px;
  height: 100px;
  background: black;
  margin: 100px auto;
}
</style>
