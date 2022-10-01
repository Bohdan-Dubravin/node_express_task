import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '888534qz',
  host: 'db',
  database: 'notes',
});

export default pool;
