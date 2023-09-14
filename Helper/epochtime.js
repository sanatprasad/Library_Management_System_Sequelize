function epochtime() {
  const currentMilliseconds = new Date().getTime();
  const epochSeconds = Math.floor(currentMilliseconds / 1000);
  return epochSeconds;
}
module.exports = {
  epochtime,
};
