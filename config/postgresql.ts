import knex from 'knex';

const knexInstance = knex({
    client: 'postgresql',
    connection: {
        user: 'postgres',
        database: 'synergy',
        password: '1234',
    },
});

export default knexInstance;
