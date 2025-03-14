function getRandomInt() {
  max = Number.MAX_SAFE_INTEGER;
  min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  getRandomInt: getRandomInt,
};
