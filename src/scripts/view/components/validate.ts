const validateInput = (type: string, text: string) => {
  const regexName = /^[a-zA-Zа-яА-Я0-9_-]{3,16}$/;
  const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  const regexPassword = /^[a-zA-Z0-9_-]{8,}$/;
  let result = false;
  switch (type) {
    case 'text':
      result = regexName.test(text);
      break
    case 'email':
      result = regexMail.test(text);
      break
    case 'password':
      result = regexPassword.test(text);
      break
    default:
      break;
  }
  return result;
};

export { validateInput };
