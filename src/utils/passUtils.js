export const generatePassword = (length, options) => {
  const charTypes = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*(){}[]+=?<>,.-_',
  };

  let password = [];
  // let availableChars = '';
  const minTotal = Object.values(options).reduce((sum, opt) => sum + opt.min, 0);

  if (minTotal > length) {
    return '⚠️ Min values exceed length';
  }

  // Step 1: Add min required characters
  for (const type in options) {
    const chars = charTypes[type];
    const { min } = options[type];
    for (let i = 0; i < min; i++) {
      password.push(chars[Math.floor(Math.random() * chars.length)]);
    }
  }

  // Step 2: Build a pool respecting max values
  const currentCounts = { upper: 0, lower: 0, numbers: 0, symbols: 0 };
  password.forEach((char) => {
    for (const type in charTypes) {
      if (charTypes[type].includes(char)) {
        currentCounts[type]++;
      }
    }
  });

  // Step 3: Fill remaining length within max constraints
  while (password.length < length) {
    const eligibleTypes = Object.keys(options).filter(
      (type) => currentCounts[type] < options[type].max
    );

    if (eligibleTypes.length === 0) break; // Can't add more without breaking max

    const type = eligibleTypes[Math.floor(Math.random() * eligibleTypes.length)];
    const chars = charTypes[type];
    const char = chars[Math.floor(Math.random() * chars.length)];

    password.push(char);
    currentCounts[type]++;
  }

  // Step 4: Shuffle the result
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
};
