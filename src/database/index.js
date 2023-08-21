const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "admin",
  password: "root",
  database: "mycontacts",
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);

  return rows;
};
