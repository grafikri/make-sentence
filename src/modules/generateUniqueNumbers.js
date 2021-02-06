export default (options = {}) => {
  const { count = 5, range = { min: 0, max: 10 } } = options;
  const min = range.min;
  const max = range.max + 1;
  if (count > max - min) throw new Error("Range can not be smaller than count");

  const numbers = [];

  for (let index = 0; index < count; index++) {
    const loop = arr => {
      const number = Math.floor(Math.random() * max);
      return numbers.indexOf(number) === -1 ? number : loop(arr);
    };

    numbers.push(loop(numbers));
  }

  return numbers;
};
