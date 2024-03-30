import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entity/Sensor.entity';
import * as dotenv from 'dotenv';
import { Message } from './entity/Message.entity';
import { MessageValue } from './entity/MessageValue.entity';
import { SensorType } from './entity/SensorType.entity';
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { enviroments } from './environments';
import * as Joi from 'joi';

dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

console.log(process.env.AZURE_SQL_SERVER);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true, //when true, stops validation on the first error, otherwise returns all the errors found. Defaults to true.
      },
    }),
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
    TypeOrmModule.forFeature([Sensor, Message, MessageValue, SensorType, User]),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
