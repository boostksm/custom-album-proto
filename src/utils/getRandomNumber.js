export default function getRandomNumber(min, max, exclude) {
  let number = null;
  while (number === null) {
    const random = Math.floor(Math.random() * (max - min)) + min;
    if (exclude.indexOf(random) === -1) number = random;
  }
  return number;
}
