export function secondsToHms(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hDisplay = h === 0 ? '' : `${h}`.padStart(2, '0') + ':';
  const mDisplay = `${m}`.padStart(2, '0') + ':';
  const sDisplay = `${s}`.padStart(2, '0');

  return hDisplay + mDisplay + sDisplay;
}
