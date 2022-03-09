import pg from 'pg';
const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL
    ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnAuthorized: false },
      }
    : {
          host: 'localhost',
          user: 'postgres',
          post: 5432,
          password: '12345',
          database: 'creatorsvideoplanner',
      };

const pool = new Pool(poolConfig);

export default pool;
