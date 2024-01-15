import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entity/Sensor.entity';
import * as dotenv from 'dotenv';
import { Message } from './entity/Message.entity';
import { MessageValue } from './entity/MessageValue.entity';
import { SensorType } from './entity/SensorType.entity';
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      authentication: {
        options: {},
        type: 'azure-active-directory-default',
      },
      host: process.env.AZURE_SQL_SERVER,
      port: parseInt(process.env.AZURE_SQL_PORT),
      database: process.env.AZURE_SQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, //use this with development enviroment
    }),
    TypeOrmModule.forFeature([Sensor, Message, MessageValue, SensorType]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
