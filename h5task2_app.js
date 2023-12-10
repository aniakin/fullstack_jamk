const userModule = require("./h5task2");

const name = userModule.getName();
const location = userModule.getLocation();
const birthday = userModule.BIRTHDAY;

console.log(`${name} lives in ${location} and was born on ${birthday}.`);