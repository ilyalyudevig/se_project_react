export function determineDayTime(sunrise, sunset, current) {
  return current >= sunrise && current <= sunset;
}
