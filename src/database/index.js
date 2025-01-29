const { Client } = require("pg");

const client = new Client({
  host: process.env.PSQL_HOSTNAME,
  port: process.env.PSQL_PORT,
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);

  return rows;
};
