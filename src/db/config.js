/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const stage = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `./src/config/.env.${stage}` });

console.log(`Running in stage: ${stage}`);
// console.log(process.env);

let config = {};
config[stage] = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  logging: (query, params) => console.log(query, params), // log queries & params
};

console.log(config);

module.exports = config;
