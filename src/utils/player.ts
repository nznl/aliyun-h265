const durationFormmat = (val: any) => {
  val = val.toString()
  if (val.length < 2) return '0' + val
  return val
}
const setDurationText = (duration: any) => {
  if (duration < 0) return 'Player'
  const randDuration = Math.round(duration)
  return (
    durationFormmat(Math.floor(randDuration / 3600)) +
    ':' +
    durationFormmat(Math.floor((randDuration % 3600) / 60)) +
    ':' +
    durationFormmat(Math.floor(randDuration % 60))
  )
}

export const createPlayerServer = (videoUrl: any, config: any) => {
  // @ts-ignore
  return window.new265webjs(videoUrl, config)
}

/**
 * get playerInstance.
 */
export type PlayerInstance = ReturnType<typeof createPlayerServer>

export const executePlayerServer = (player: any, timelineEl?: any) => {
  // todo....
  let mediaInfo: any = null
  player.onLoadFinish = () => {
    mediaInfo = player.mediaInfo()
    if (mediaInfo.videoType === 'vod') {
      if (timelineEl) {
        timelineEl.textContent =
        setDurationText(0) +
        '/' +
        setDurationText(mediaInfo.meta.durationMs / 1000)
      }
    }
  }
  player.onPlayTime = (pts: any) => {
    if (mediaInfo.videoType === 'vod') {
      if (timelineEl) {
        timelineEl.textContent =
        setDurationText(pts) +
        '/' +
        setDurationText(mediaInfo.meta.durationMs / 1000)
      }
    }
  }
  player.do()
}

export const destoryPlayerServer = (playerInstance: PlayerInstance) => {
  // release playerInstance & forece Gc
  playerInstance.release()
  playerInstance = null
}
