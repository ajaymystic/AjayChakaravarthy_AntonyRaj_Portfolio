export function videoPlayer() {
  const player = document.querySelector("#player");

  if (!player) return;

  if (typeof Plyr === "undefined") {
    console.warn("Plyr is not loaded");
    return;
  }

  function handlePlay() {
    console.log("Video is playing");
  }

  function handlePause() {
    console.log("Video is paused");
  }

  function handleEnded() {
    console.log("Video ended");
  }

  const plyrInstance = new Plyr(player, {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "fullscreen",
    ],
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 2],
    },
  });

  plyrInstance.on("play", handlePlay);
  plyrInstance.on("pause", handlePause);
  plyrInstance.on("ended", handleEnded);
}