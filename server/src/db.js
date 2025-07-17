import promise from 'mysql2/promise';

const pool = promise.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'db_productsbanners',
});

export default pool;