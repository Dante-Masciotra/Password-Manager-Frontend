
const CalcPasswordStr = (password) => {
    if (!password || password.length < 8) {
      return 0; // Return 0 when the password is less than 8 characters
    }

    // Regular expressions
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&?]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    let strengthScore = 0;


    // Score reduction of 2 for common password sequence
    var commonFlag=true;
    for (let i = 0; i < password.length; i++) {
        if(commonFlag){
            if(/[A-Z]/.test(password[i]) && (/[a-z]/.test(password[i+1]) || /[A-Z]/.test(password[i+1]))){
                commonFlag=true;
            }else if(/[a-z]/.test(password[i]) && (/[a-z]/.test(password[i+1]) || /\d/.test(password[i+1]) )){
                commonFlag=true;
            }else if(/\d/.test(password[i]) && (/\d/.test(password[i+1]) || /[!@#$%^&*?]/.test(password[i+1]) )){
                commonFlag=true;
            }else if(/[!@#$%^&*?]/.test(password[i]) && (i+2>password.length||/[!@#$%^&*?]/.test(password[i+1])) ){
                commonFlag=true;
            }else{
                commonFlag=false
            }
        }
      }

    if(commonFlag){
        strengthScore -= 2;
        console.log("hit5")
    }

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
