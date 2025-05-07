export const generatePassword = (length, options) => {
  const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*(){}[]+=?<>,.-_',
  };

  let passwordChars = [];
  let availableTypes = [];

  // 1. Ensure total max ≥ length
  let totalMax = Object.values(options).reduce((sum, opt) => sum + opt.max, 0);
  if (totalMax < length) {
    // Distribute extra capacity across types proportionally
    const diff = length - totalMax;
    const enabledTypes = Object.keys(options).filter(k => options[k].min > 0);
    const spread = Math.ceil(diff / enabledTypes.length);
    enabledTypes.forEach((type) => {
      options[type].max += spread;
    });
  }

  // 2. Add min required characters
  const usageCount = {};
  for (const type in options) {
    const { min, max } = options[type];
    if (min > 0) {
      availableTypes.push(type);
      usageCount[type] = min;
      for (let i = 0; i < min; i++) {
        passwordChars.push(
          charSets[type][Math.floor(Math.random() * charSets[type].length)]
        );
      }
    } else {
      usageCount[type] = 0;
    }
  }

  // 3. Fill remaining with respect to max
  let remaining = length - passwordChars.length;
  while (remaining > 0) {
    const allowedTypes = availableTypes.filter(
      (type) => usageCount[type] < options[type].max
    );
    if (allowedTypes.length === 0) break;

    const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    passwordChars.push(
      charSets[type][Math.floor(Math.random() * charSets[type].length)]
    );
    usageCount[type]++;
    remaining--;
  }

  // Shuffle
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join('');
};
