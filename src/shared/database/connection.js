import { Sequelize } from 'sequelize';

/**
 * Connection to the db
 */
const DataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        useUTC: false,
    },
    timezone: '-04:00',
});

/**
 * Test connection to the db
 */
const establishConnection = async () => {
    try {
        await DataBase.authenticate();

        console.log('The connection to the database has been \x1b[32msuccessfully\x1b[0m established.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

DataBase.establishConnection = establishConnection;

export default DataBase;