export const generatePassword = (length, options) => {
    const { upper, lower, numbers, symbols } = options;
  
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*(){}[]+=?<>,.-_';
  
    if (!chars) return ''; // prevent empty password
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return password;
  };
  