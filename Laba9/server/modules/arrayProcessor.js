function sortArray(arr) {
  return [...arr].sort((a, b) => a - b);
}

function findMax(arr) {
  return Math.max(...arr);
}

module.exports = { sortArray, findMax };