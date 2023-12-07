<template>
  <video id="preview" autoplay></video>
  <canvas id="canvas" style="display: none;"></canvas>
  <img id="photo" alt="Photo" style="display: none;"/>
  <button id="takePhotoButton">拍照</button>

  <video id="recording" controls style="display: none;"></video>
  <button id="startRecordingButton">开始录制</button>
  <button id="stopRecordingButton">停止录制</button>
</template>

<script lang="ts" setup>
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true})
            .then(function (stream) {
                var videoElement = document.getElementById("preview") as HTMLVideoElement;
                var canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
                var context = canvasElement.getContext("2d") as any;
                var imageElement = document.getElementById("photo") as any;
                var takePhotoButton = document.getElementById("takePhotoButton") as HTMLElement;
                videoElement.srcObject = stream;
                let mediaStreamTrack = stream;
                takePhotoButton.addEventListener("click", function () {
                    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                    imageElement.src = canvasElement.toDataURL("image/png");
                    imageElement.style.display = "block";
                    mediaStreamTrack.getVideoTracks().forEach(track => {
                    track.stop()
                })
                videoElement.srcObject = null
                });

                var recordingElement = document.getElementById("recording") as any;
                var startRecordingButton = document.getElementById("startRecordingButton") as any;
                var stopRecordingButton = document.getElementById("stopRecordingButton") as any;

                var mediaRecorder: any;

                startRecordingButton.addEventListener("click", function () {
                    var chunks: any = [];
                    mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.ondataavailable = function (e: any) {
                        chunks.push(e.data);
                    };

                    mediaRecorder.onstop = function () {
                        var blob = new Blob(chunks, {type: "video/webm"});
                        recordingElement.src = URL.createObjectURL(blob);
                    };

                    mediaRecorder.start();
                    recordingElement.style.display = "block";

                });

                stopRecordingButton.addEventListener("click", function () {
                    mediaRecorder.stop();
                });
            })
            .catch(function (error) {
                console.error("获取摄像头输入流失败:", error);
            });
    } else {
        console.error("浏览器不支持摄像头调用");
    }
</script>
