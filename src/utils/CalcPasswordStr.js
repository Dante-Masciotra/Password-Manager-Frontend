
const CalcPasswordStr = (password) => {
    if (!password || password.length < 8) {
      return 0; // Return 0 when the password is less than 8 characters
    }

    // Regular expressions
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasNumbers = /\d/.test(password);

    let strengthScore = 0;

    // Score for having 13 or more characters
    if (password.length >= 13) {
    strengthScore += 1;
    }

    // Score for having capital letters
    if (hasUppercase) {
    strengthScore += 1;
    }

    // Score for having lowercase letters
    if (hasLowercase) {
    strengthScore += 1;
    }

    // Score for having special characters
    if (hasSpecialChar) {
    strengthScore += 1;
    }

    // Score for having at least two numbers
    if (hasNumbers && password.match(/\d/g).length >= 2) {
    strengthScore += 1;
    }
    
    return strengthScore;
  };
  export default CalcPasswordStr;
