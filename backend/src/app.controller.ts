import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sensor')
  async findAllSensors(): Promise<any> {
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
}
