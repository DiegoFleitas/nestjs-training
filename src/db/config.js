/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const stage = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `./src/config/.env.${stage}` });

console.log(`Running in stage: ${stage}`);

let config = {};
config[stage] = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: console.log, // log queries
};

module.exports = config;
