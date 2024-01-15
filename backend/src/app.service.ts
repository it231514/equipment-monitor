import { Injectable } from '@nestjs/common';
import { Sensor } from './entity/Sensor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/Message.entity';
import { MessageValue } from './entity/MessageValue.entity';
import { SensorType } from './entity/SensorType.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(MessageValue)
    private readonly messageValueRepository: Repository<MessageValue>,
    @InjectRepository(SensorType)
    private readonly sensorTypeRepository: Repository<SensorType>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async findAll(): Promise<any> {
    const sensor = await this.sensorRepository.find();
    console.log(sensor);
    return sensor;
  }
  async findAllMessages(): Promise<any> {
    const messages = await this.messageRepository.find({ take: 10 });
    console.log(messages);
    return messages;
  }
  async findAllMessageValues(): Promise<any> {
    const messages = await this.messageValueRepository.find({ take: 10 });
    console.log(messages);
    return messages;
  }
  async findAllSensorTypes(): Promise<any> {
    const sensorType = await this.sensorTypeRepository.find({ take: 10 });
    console.log(sensorType);
    return sensorType;
  }
}
