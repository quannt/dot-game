export function playSound(url) {
  const soundSource = new URL(url, import.meta.url);
  const audio = new Audio(soundSource.href);
  audio.play();
  return audio;
}
