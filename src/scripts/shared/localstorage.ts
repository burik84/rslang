import { IUserAuth } from './interface';
const setValue = (value: IUserAuth, key = 'user') => {
  const name = `rsteam17-${key}`;
  const valueJSON = JSON.stringify(value);

  localStorage.setItem(name, valueJSON);
};

const getValue = (key = 'user') => {
  const name = `rsteam17-${key}`;
  const value = JSON.parse(localStorage.getItem(name));

  return value;
};

const resetValue = (key = 'user') => {
  const name = `rsteam17-${key}`;
  localStorage.removeItem(name);
};
export { setValue, getValue, resetValue };
