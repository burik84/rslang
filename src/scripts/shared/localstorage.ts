
const setValue = (value, key='user') => {
    const name=`burik84-${key}`;
    const valueJSON=JSON.stringify(value);

    localStorage.setItem(name, valueJSON);
};

const getValue = (key='user') => {
    const name=`burik84-${key}`;
    const value = JSON.parse(localStorage.getItem(name));

    return value;
};

const resetValue = (key='user') => {
    const name=`burik84-${key}`;
    localStorage.removeItem(name);
};
export { setValue, getValue,  resetValue };