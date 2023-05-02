(() => {
  if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
  ) {
    alert("O seu navagador não tem suporte para acessar a câmera.");
    return;
  }

  const video = document.querySelector("#video");
  const screenshotButton = document.getElementById("screenshot-button");
  const screenshotList = document.getElementById("screenshot-list");
  const canvas = document.getElementById("canvas");

  let videoStream;

  const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 1920,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1080,
      },
    },
  };

  screenshotButton.addEventListener("click", () => screenshot());

  const screenshot = () => {
    const img = document.createElement("img");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    img.src = canvas.toDataURL("image/png");
    screenshotList.prepend(img);
  };

  const initializeCamera = async () => {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = videoStream;
    } catch (e) {
      alert("Sem acesso à câmera.");
    }
  };

  initializeCamera();
})();
