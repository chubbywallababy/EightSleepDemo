export const getRandomNumberInRange = (min: number, max: number): number => {
  // Ensure min is less than or equal to max
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value.');
  }

  // Generate random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the decimal to the desired range (min to max)
  const range = max - min + 1; // Adding 1 to include the max value
  const scaledDecimal = randomDecimal * range;

  // Add the minimum value to get the final random number within the range
  return Math.floor(scaledDecimal + min);
};
