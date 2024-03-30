import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards, HttpCode } from '@nestjs/common';
import { RolesGuard } from './auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@UseGuards(RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'get all Sensors' })
  // @ApiOkResponse({})
  // @ApiHeader({
  //   name: 'Bearer',
  //   description: 'the token we need for auth.',
  // })
  @Get('/sensor')
  async findAllSensors(): Promise<any> {
    return await this.appService.findAll();
  }
  @Get('/sensor/id')
  async findSensorsByID(): Promise<any> {
    //A737D7
    return await this.appService.findAll();
  }
  @Get('/message')
  async findAllMessages(): Promise<any> {
    return await this.appService.findAllMessages();
  }
  @Get('/messageValue')
  async findAllMessageValues(): Promise<any> {
    return await this.appService.findAllMessageValues();
  }
  @Get('/sensorType')
  async findAllSensorType(): Promise<any> {
    return await this.appService.findAllSensorTypes();
  }

  @Get('/messageValuesForSensor/:sensorId?/:tag?')
  async getMessageValueForSensor(
    @Param('sensorId') sensorId?: string,
    @Param('tag') tag?: string,
  ): Promise<any> {
    return await this.appService.findTemperatureMessages(sensorId, tag);
  }
}
