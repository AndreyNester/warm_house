import {
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { HeatingService } from './heating.service';
import {
  HeatingProfileDto,
  SetTargetTemperatureDto,
  SetScheduleDto,
  CreateOverrideDto,
} from './dto/heating-profile.dto';

@ApiTags('heating')
@Controller('heating')
export class HeatingController {
  constructor(private readonly heatingService: HeatingService) {}

  @Get('zones')
  @ApiOperation({ summary: 'Получить список зон отопления' })
  @ApiResponse({ status: 200, type: [HeatingProfileDto] })
  getZones(): HeatingProfileDto[] {
    return this.heatingService.findAll();
  }

  @Get('zones/:zoneId')
  @ApiOperation({ summary: 'Получить профиль отопления для зоны' })
  @ApiParam({ name: 'zoneId', example: 'living-room' })
  @ApiResponse({ status: 200, type: HeatingProfileDto })
  @ApiResponse({ status: 404, description: 'Zone not found' })
  getZone(@Param('zoneId') zoneId: string): HeatingProfileDto {
    return this.heatingService.findOne(zoneId);
  }

  @Patch('zones/:zoneId/target-temperature')
  @ApiOperation({ summary: 'Обновить целевую температуру для зоны' })
  @ApiParam({ name: 'zoneId', example: 'living-room' })
  @ApiBody({ type: SetTargetTemperatureDto })
  @ApiResponse({ status: 200, type: HeatingProfileDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Zone not found' })
  updateTargetTemperature(
    @Param('zoneId') zoneId: string,
    @Body() dto: SetTargetTemperatureDto,
  ): HeatingProfileDto {
    return this.heatingService.updateTargetTemperature(zoneId, dto);
  }

  @Put('zones/:zoneId/schedule')
  @ApiOperation({ summary: 'Задать расписание отопления для зоны' })
  @ApiParam({ name: 'zoneId', example: 'living-room' })
  @ApiBody({ type: SetScheduleDto })
  @ApiResponse({ status: 200, type: HeatingProfileDto })
  @ApiResponse({ status: 404, description: 'Zone not found' })
  setSchedule(
    @Param('zoneId') zoneId: string,
    @Body() dto: SetScheduleDto,
  ): HeatingProfileDto {
    return this.heatingService.setSchedule(zoneId, dto);
  }

  @Post('zones/:zoneId/override')
  @ApiOperation({ summary: 'Создать временный override температуры для зоны' })
  @ApiParam({ name: 'zoneId', example: 'living-room' })
  @ApiBody({ type: CreateOverrideDto })
  @ApiResponse({ status: 201, type: HeatingProfileDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Zone not found' })
  createOverride(
    @Param('zoneId') zoneId: string,
    @Body() dto: CreateOverrideDto,
  ): HeatingProfileDto {
    return this.heatingService.createOverride(zoneId, dto);
  }

    @Get('temperature')
  @ApiOperation({ summary: 'Получить случайное значение температуры (temperature-api)' })
  @ApiQuery({ name: 'location', required: false, example: 'Living Room' })
  @ApiQuery({ name: 'sensorId', required: false, example: '1' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        sensorId: '1',
        location: 'Living Room',
        value: 22.5,
        unit: 'C',
        timestamp: '2025-11-27T12:34:56.000Z',
      },
    },
  })
  getTemperature(
    @Query('location') location?: string,
    @Query('sensorId') sensorId?: string,
  ) {
    return this.heatingService.getRandomTemperature(location, sensorId);
  }

  @Get('temperature/health')
  @ApiOperation({ summary: 'Проверка работоспособности temperature-api' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { status: 'ok' },
    },
  })
  health() {
    return { status: 'ok' };
  }
}
