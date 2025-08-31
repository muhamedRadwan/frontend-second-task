// Makes time look pretty and easy to read
export function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return min + ':' + (sec < 10 ? '0' + sec : sec);
}
