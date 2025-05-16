// External
import SequelizeAuto from "sequelize-auto";
// Own
import '../src/config/loadEnv.js';

const auto = new SequelizeAuto(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    directory: './src/shared/database/models',
    port: process.env.DB_PORT,
    caseModel: 'c',
    caseFile: 'c',
    lang: 'esm',
    tables: [
        'users'
    ],
    views: true,
    additional: {
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    },
    logging: console.log
});

auto.run().then(data => {
    console.log('Process Completed')
});
