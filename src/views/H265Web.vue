<template>
  <div class="context">
    <div class="player-container">
      <div id="glplayer" class="glplayer"></div>
      <br>
      <div>
        <button @click="handleTools('play')">播放</button>
        <button @click="handleTools('pause')">暂停</button>
        <button @click="handleTools('metaInfo')">获取媒体信息</button>
        <button @click="handleTools('fullScreen')">全屏播放</button>
      </div>
    </div>
    <div id="snapshot-player"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { createPlayerServer, executePlayerServer, destoryPlayerServer } from '@/utils/player';

const H265JS_DEFAULT_PLAYER_CONFIG = {
  player: 'glplayer',
  width: 960,
  height: 540,
  token:
    'base64:QXV0aG9yOmNoYW5neWFubG9uZ3xudW1iZXJ3b2xmLEdpdGh1YjpodHRwczovL2dpdGh1Yi5jb20vbnVtYmVyd29sZixFbWFpbDpwb3JzY2hlZ3QyM0Bmb3htYWlsLmNvbSxRUTo1MzEzNjU4NzIsSG9tZVBhZ2U6aHR0cDovL3h2aWRlby52aWRlbyxEaXNjb3JkOm51bWJlcndvbGYjODY5NCx3ZWNoYXI6bnVtYmVyd29sZjExLEJlaWppbmcsV29ya0luOkJhaWR1',
  extInfo: {
    moovStartFlag: true,
  },
}

    const videoUrl: string = require("../assets/test.mp4");
    // const videoUrl: string = "https://outin-ef36831f432211ee86f500163e1c9256.oss-cn-shanghai.aliyuncs.com/7027ffd0432371ee91295017f1e80102/a2a00bf8bb9e76806fa4a23e827620c1-ld.m3u8?Expires=1694076609&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=KHINKf0NZx3ac%2BXyUk7j72xyPeg%3D&x-oss-process=hls%2Fsign";
    let player: any = null

    const resolveConfig = (conf?: Record<string, any>) =>
      Object.assign(H265JS_DEFAULT_PLAYER_CONFIG, conf)

    onMounted(async () => {
      player = createPlayerServer(videoUrl, resolveConfig());
      executePlayerServer(player);
      await nextTick();
    })

    onUnmounted(() => destoryPlayerServer(player))
    function handleTools(action: string) {
      switch(action) {
        case 'play':
          player.play();
          break;
        case 'pause':
          player.pause();
          break;
        case 'metaInfo':
          console.log( player.mediaInfo());
          break;
        case 'fullScreen':
          player.fullScreen();
          break;
      }
    }
</script>

<style lang="less" scoped>
@primary: rgb(0, 132, 255);
.player-container {
  width: 960px;
  height: 540px;
  button {
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 12px;
      color: @primary
    }
  }
}
#snapshot-player {
  width: 300px;
  height: 168px;
}
</style>
