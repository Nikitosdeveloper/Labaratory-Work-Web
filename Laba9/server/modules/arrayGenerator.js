function generateArray(size, min, max) {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

module.exports = { generateArray };