const local=false;

const urlHTTP='https://rs-lang-team17-be.herokuapp.com/';
const urllocal='http://localhost:4000/';

export const urlAPI=local?urllocal:urlHTTP;