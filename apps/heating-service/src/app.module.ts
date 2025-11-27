import { Module } from '@nestjs/common';
import { HeatingModule } from './heating/heating.module';

@Module({
  imports: [HeatingModule],
})
export class AppModule {}
