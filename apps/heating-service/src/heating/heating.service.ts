import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import {
  HeatingProfileDto,
  SetTargetTemperatureDto,
  SetScheduleDto,
  CreateOverrideDto,
} from './dto/heating-profile.dto';

@Injectable()
export class HeatingService {
  private profiles: HeatingProfileDto[] = [
    {
      zoneId: 'living-room',
      zoneName: 'Гостиная',
      currentTemperature: 22.3,
      targetTemperature: 23,
      mode: 'AUTO',
      state: 'HEATING',
      schedule: [],
      override: null,
    },
    {
      zoneId: 'bedroom',
      zoneName: 'Спальня',
      currentTemperature: 20.1,
      targetTemperature: 21,
      mode: 'AUTO',
      state: 'IDLE',
      schedule: [],
      override: null,
    },
  ];

  findAll(): HeatingProfileDto[] {
    // В реале можно возвращать "облегчённый" DTO, но пока полный
    return this.profiles;
  }

  findOne(zoneId: string): HeatingProfileDto {
    const profile = this.profiles.find((p) => p.zoneId === zoneId);
    if (!profile) {
      throw new NotFoundException('Zone not found');
    }
    return profile;
  }

  updateTargetTemperature(
    zoneId: string,
    dto: SetTargetTemperatureDto,
  ): HeatingProfileDto {
    const profile = this.findOne(zoneId);

    if (dto.targetTemperature < 5 || dto.targetTemperature > 35) {
      throw new BadRequestException('Target temperature is out of range');
    }

    profile.targetTemperature = dto.targetTemperature;
    if (dto.mode) {
      profile.mode = dto.mode;
    }

    // На реальном сервисе тут была бы логика пересчёта state и отправки команды устройству
    profile.state = 'HEATING';

    return profile;
  }

  setSchedule(zoneId: string, dto: SetScheduleDto): HeatingProfileDto {
    const profile = this.findOne(zoneId);
    profile.schedule = dto.entries ?? [];
    return profile;
  }

  createOverride(zoneId: string, dto: CreateOverrideDto): HeatingProfileDto {
    const profile = this.findOne(zoneId);

    if (dto.targetTemperature < 5 || dto.targetTemperature > 35) {
      throw new BadRequestException('Target temperature is out of range');
    }

    profile.override = {
      targetTemperature: dto.targetTemperature,
      until: dto.until,
    };

    // В реале: сохранить в БД, опубликовать событие, отправить команду устройству
    profile.state = 'HEATING';

    return profile;
  }
  
   getRandomTemperature(location?: string, sensorId?: string) {
    let loc = location || '';
    let sid = sensorId || '';

    // Если не передали location — берём по sensorId
    if (!loc) {
      switch (sid) {
        case '1':
          loc = 'Living Room';
          break;
        case '2':
          loc = 'Bedroom';
          break;
        case '3':
          loc = 'Kitchen';
          break;
        default:
          loc = 'Unknown';
      }
    }

    // Если не передали sensorId — берём по location
    if (!sid) {
      switch (loc) {
        case 'Living Room':
          sid = '1';
          break;
        case 'Bedroom':
          sid = '2';
          break;
        case 'Kitchen':
          sid = '3';
          break;
        default:
          sid = '0';
      }
    }

    const value = 18 + Math.random() * 10; // 18–28 °C

    return {
      sensorId: sid,
      location: loc,
      value: parseFloat(value.toFixed(1)),
      unit: 'C',
      timestamp: new Date().toISOString(),
    };
  }
}
