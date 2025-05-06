export const generatePassword = (length, options) => {
  const { upper, lower, numbers, symbols } = options;

  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*(){}[]+=?<>,.-_';

  let allChars = '';
  let requiredChars = [];

  if (upper) {
    allChars += upperChars;
    requiredChars.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
  }
  if (lower) {
    allChars += lowerChars;
    requiredChars.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
  }
  if (numbers) {
    allChars += numberChars;
    requiredChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
  }
  if (symbols) {
    allChars += symbolChars;
    requiredChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
  }

  if (!allChars) return '';

  // Fill the remaining length
  const remainingLength = length - requiredChars.length;
  let password = requiredChars;

  for (let i = 0; i < remainingLength; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle to avoid predictable character placement
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
};
