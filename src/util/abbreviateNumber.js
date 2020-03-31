/* eslint-disable no-bitwise */
/**
 * Abbreviates a large number. Taken from: https://stackoverflow.com/a/40724354
 * @param {number} number
 * @param {number} precision
 * @return {string}
 */
const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

const abbreviateNumber = (number, precision = 1) => {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(number) / 3) | 0;

  // if zero, we don't need a suffix
  if (!tier) {
    return number;
  }

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(precision) + suffix;
};

export default abbreviateNumber;
