// heating/dto/heating-profile.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ScheduleEntryDto } from './schedule-entry.dto';

export class OverrideDto {
  @ApiProperty({ example: 24 })
  targetTemperature: number;

  @ApiProperty({ example: '2025-11-27T22:00:00Z' })
  until: string;
}

export class HeatingProfileDto {
  @ApiProperty({ example: 'living-room' })
  zoneId: string;

  @ApiProperty({ example: 'Гостиная' })
  zoneName: string;

  @ApiProperty({ example: 22.3 })
  currentTemperature: number;

  @ApiProperty({ example: 23 })
  targetTemperature: number;

  @ApiProperty({ example: 'AUTO', enum: ['MANUAL', 'AUTO', 'OFF'] })
  mode: 'MANUAL' | 'AUTO' | 'OFF';

  @ApiProperty({ example: 'HEATING', enum: ['HEATING', 'IDLE', 'OFF'] })
  state: 'HEATING' | 'IDLE' | 'OFF';

  @ApiProperty({ type: [ScheduleEntryDto] })
  schedule: ScheduleEntryDto[];

  @ApiProperty({ type: () => OverrideDto, nullable: true, required: false })
  override?: OverrideDto | null;
}

export class SetTargetTemperatureDto {
  @ApiProperty({ example: 24 })
  targetTemperature: number;

  @ApiProperty({
    example: 'MANUAL',
    enum: ['MANUAL', 'AUTO', 'OFF'],
    required: false,
  })
  mode?: 'MANUAL' | 'AUTO' | 'OFF';
}

export class SetScheduleDto {
  @ApiProperty({ type: [ScheduleEntryDto] })
  entries: ScheduleEntryDto[];
}

export class CreateOverrideDto {
  @ApiProperty({ example: 25 })
  targetTemperature: number;

  @ApiProperty({ example: '2025-11-27T23:00:00Z' })
  until: string;
}
