import Knex from 'knex';

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

const knex = Knex({
    client: 'pg',
    connection: poolConfig,
});
export default knex;
