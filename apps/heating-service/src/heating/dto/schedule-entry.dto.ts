// heating/dto/schedule-entry.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleEntryDto {
  @ApiProperty({ example: 'MON', description: 'День недели: MON..SUN' })
  dayOfWeek: string;

  @ApiProperty({ example: '06:00', description: 'Время начала (HH:mm)' })
  from: string;

  @ApiProperty({ example: '09:00', description: 'Время окончания (HH:mm)' })
  to: string;

  @ApiProperty({ example: 23, description: 'Целевая температура, °C' })
  targetTemperature: number;
}
