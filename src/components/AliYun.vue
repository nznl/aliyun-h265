<template>
  <div
    :id="props.playerId"
  >
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUpdated, nextTick, watch } from 'vue';
interface Config {
  id?: string | null;
  source?: string | null;
  vid?: string | null; // 媒体转码服务的媒体ID。
  playauth?: boolean; // 	播放凭证，获取播放凭证请参见获取音视频播放凭证。
  height?: string;
  width?: string;
  videoWidth?: string;
  videoHeight?: string;
  preload?: string;
  cover?: string; // 需要autoplay为false配合
  isLive?: boolean;
  autoplay?: boolean; // 播放器是否自动播放，在移动端autoplay属性会失效
  rePlay?: boolean; // 自动循环
  useH5Prism?: string;
  useFlashPrism?: string;
  playsinline?: boolean;
  skinRes?: boolean; // 播放器皮肤
  [key: string]: any;
}
interface Props {
  playerId: string;
  forbidFastForward?: boolean;
  options?: Config;
  source?: string;
  cssLink?: string;
  scriptSrc?: string;
  componentJs?: string;
}

const props = withDefaults(defineProps<Props>(), {
  playerId: '',
  forbidFastForward: false,
  options: () => ({}),
  source: '',
  cssLink: 'https://g.alicdn.com/apsara-media-box/imp-web-player/2.16.5/skins/default/aliplayer-min.css',
  scriptSrc: 'https://g.alicdn.com/apsara-media-box/imp-web-player/2.16.5/aliplayer-min.js',
});
const player = ref<any>(null);
const config: Config = {};
const events: any = [
      /**
       * 播放器视频初始化按钮渲染完毕。
       * 播放器UI初始设置需要此事件后触发，避免UI被初始化所覆盖。
       * 播放器提供的方法需要在此事件发生后才可以调用。
       */
        'ready',
      /**
       * 视频由暂停恢复为播放时触发。
       */
      'play',
      /**
       * 视频暂停时触发。
       */
      'pause',
      /**
       * 能够开始播放音频/视频时发生，会多次触发，仅H5播放器。
       */
      'canplay',
      /**
       * 播放中，会触发多次。
       */
      'playing',
      /**
       * 当前视频播放完毕时触发。
       */
      'ended',
      /**
       * 直播流中断时触发。
       * m3u8/flv/rtmp在重试5次未成功后触发。
       * 提示上层流中断或需要重新加载视频。
       * PS：m3u8一直自动重试，不需要上层添加重试。
       */
      'liveStreamStop',
      /**
       * m3u8直播流中断后重试事件，每次断流只触发一次。
       */
      'onM3u8Retry',
      /**
       * 控制栏自动隐藏事件。
       */
      'hideBar',
      /**
       * 控制栏自动显示事件。
       */
      'showBar',
      /**
       * 数据缓冲事件。
       */
      'waiting',
      /**
       * 播放位置发生改变时触发，仅H5播放器。
       * 可通过getCurrentTime方法，得到当前播放时间。
       */
      'timeupdate',
      /**
       * 截图完成。
       */
      'snapshoted',
      /**
       * 全屏事件，仅H5支持。
       */
      'requestFullScreen',
      /**
       * 取消全屏事件，iOS下不会触发，仅H5支持。
       */
      'cancelFullScreen',
      /**
       * 错误事件。
       */
      'error',
      /**
       * 开始拖拽，参数返回拖拽点的时间。
       */
      'startSeek',
      /**
       * 完成拖拽，参数返回拖拽点的时间。
       */
      'completeSeek'
];
const emits = defineEmits([  /**
       * 播放器视频初始化按钮渲染完毕。
       * 播放器UI初始设置需要此事件后触发，避免UI被初始化所覆盖。
       * 播放器提供的方法需要在此事件发生后才可以调用。
       */
        'ready',
      /**
       * 视频由暂停恢复为播放时触发。
       */
      'play',
      /**
       * 视频暂停时触发。
       */
      'pause',
      /**
       * 能够开始播放音频/视频时发生，会多次触发，仅H5播放器。
       */
      'canplay',
      /**
       * 播放中，会触发多次。
       */
      'playing',
      /**
       * 当前视频播放完毕时触发。
       */
      'ended',
      /**
       * 直播流中断时触发。
       * m3u8/flv/rtmp在重试5次未成功后触发。
       * 提示上层流中断或需要重新加载视频。
       * PS：m3u8一直自动重试，不需要上层添加重试。
       */
      'liveStreamStop',
      /**
       * m3u8直播流中断后重试事件，每次断流只触发一次。
       */
      'onM3u8Retry',
      /**
       * 控制栏自动隐藏事件。
       */
      'hideBar',
      /**
       * 控制栏自动显示事件。
       */
      'showBar',
      /**
       * 数据缓冲事件。
       */
      'waiting',
      /**
       * 播放位置发生改变时触发，仅H5播放器。
       * 可通过getCurrentTime方法，得到当前播放时间。
       */
      'timeupdate',
      /**
       * 截图完成。
       */
      'snapshoted',
      /**
       * 全屏事件，仅H5支持。
       */
      'requestFullScreen',
      /**
       * 取消全屏事件，iOS下不会触发，仅H5支持。
       */
      'cancelFullScreen',
      /**
       * 错误事件。
       */
      'error',
      /**
       * 开始拖拽，参数返回拖拽点的时间。
       */
      'startSeek',
      /**
       * 完成拖拽，参数返回拖拽点的时间。
       */
      'completeSeek']);

onMounted(() => {
  nextTick( () => {
     init();
  });
});

onUpdated(() => {
  nextTick(() => {
    init();
  });
});

watch(() => props.source, newSource => {
  init();
});

watch(() => props.forbidFastForward, newFor => {
  init();
});

watch(() => props.options, newOptions => {
  init();
}, {
  deep: true
});
watch(() => props.playerId, newId => {
  init();
});

async function init() {
  const linkID = 'app__aliplayer-min-css';
  const scriptID = 'app_aliplayer-min-js';
  const head = document.head; // 头部
  const html =document.querySelector('html');
  const linkTag = document.getElementById(linkID);
  let scriptTag = document.getElementById(scriptID);
  if (!linkTag) {
    const link = document.createElement('link');
    const cssAttr: { [key: string]: any} = {
      type: 'text/css',
      rel: 'stylesheet',
      href: props.cssLink,
      id: linkID
    }
    for (let key in cssAttr) {
      link.setAttribute(key, cssAttr[key]);
    }
    head.appendChild(link);
  }
  if(!scriptTag) {
     scriptTag = document.createElement('script');
    const jsAttr: { [key: string]: any } = {
      type: 'text/javascript',
      id: scriptID,
      src: props.scriptSrc
    }
    for (let key in jsAttr) {
      scriptTag.setAttribute(key, jsAttr[key]);
    }
    html?.appendChild(scriptTag);
  } else {
    initPlayer();
  }
    //兼容单页加载和硬加载
    scriptTag?.addEventListener("load", () => {
      initPlayer();
    });
}

// 创建播放器
function initPlayer() {
  if (typeof (window as any).Aliplayer != 'undefined') {
    const options = deepCloneObject(props.options);
    if (options) {
      for (let key in options) {
        config[key] = options[key];
      }
    }
    if (props.source) {
      config.source = props.source;
    }
    config.id = props.playerId; // 容器id
    player.value && player.value.dispose(); // 销毁，防止重复
    player.value = Aliplayer(config);
    console.log(player.value, Aliplayer)
    for (let ev in events) {
      player.value && player.value.on(events[ev], (e: Event) => {
        emits(events[ev], e);
      })
    }
    // 禁止拖拽
    if (props.forbidFastForward) {
      let last = 0, max_time = 0;
      player.value.on('timeupdate', function () {
          let current = getCurrentTime();
          if (current - last > 2) {
              seek(last);
          } else {
              last = current;
              if (last >= max_time) {
                  max_time = last;
              }
          }
      });
    }
  }
}

// 获取播放器实例
function getPlayer() {
  return player.value;
}

// 播放
function play() {
  player.value && player.value.play();
}

// 暂停
function pause() {
  player.value && player.value.pause();
}

// 重播
function replay() {
  player.value && player.value.replay();
}

// 跳转到某个时刻进行播放，time的单位为秒。
function seek(time: number) {
  player.value && player.value.seek();
}

// 获取当前的播放时刻，返回的单位为秒。
function getCurrentTime() {
  return player.value && player.value.getCurrentTime();
}

function dispose() {
  return player.value && player.value.dispose();
}
function deepCloneObject(obj: any) {
  if (typeof obj !== 'object') return;
  const deepObj: any = Array.isArray(obj) ? [] : {};
  for (let key  in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        deepObj[key] = deepCloneObject(obj[key]);
      } else {
        deepObj[key] = obj[key];
      }
    }
  }
  return deepObj;
}
</script>

