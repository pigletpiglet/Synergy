import client from 'pg';

const pool = new client.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'synergy',
  password: '1234',
  port: 5432,
});

export default pool;
