import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Heating + Temperature API')
    .setDescription('Heating service + temperature-api mock')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 8081; // <-- важно для задания
  await app.listen(port);
  console.log(`Heating/temperature service running on http://localhost:${port}`);
  console.log(`Swagger → http://localhost:${port}/api-docs`);
}

bootstrap();
