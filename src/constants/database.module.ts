import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppDataSource } from '../../db/data-source';
import { DataSourceOptions } from "typeorm";

const AppDataSourceOptions: DataSourceOptions = AppDataSource.options
@Module({
    imports: [TypeOrmModule.forRoot(AppDataSourceOptions)]
})
export class DatabaseModule {}