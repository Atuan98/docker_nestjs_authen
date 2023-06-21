import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const envConfig = dotenv.parse(fs.readFileSync('.env'))

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: envConfig.DATABASE_HOST,
    port: parseInt(envConfig.DATABASE_PORT),
    username: envConfig.DATABASE_USER,
    password: envConfig.DATABASE_PASSWORD,
    database: envConfig.DATABASE_NAME,
    entities: ["dist/**/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: false
})
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })